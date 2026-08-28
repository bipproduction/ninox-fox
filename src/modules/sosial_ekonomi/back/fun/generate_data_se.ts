"use server"
import prisma from "@/modules/_global/bin/prisma"
import { revalidatePath } from "next/cache"

/**
 * Registry seluruh tabel DATA SOSIAL EKONOMI (satu baris per kecamatan).
 * `cols` = kolom nilai (Float) yang diisi. `decimal` = true untuk kolom jarak (km).
 * Nama tabel & kolom statis (bukan input user) sehingga aman dipakai pada raw SQL;
 * id wilayah tetap lewat parameter ($1/$2/$3).
 */
const SE_TABLES: { table: string, cols: string[], decimal?: boolean }[] = [
   { table: "SE_Ketenagakerjaan_JaminanKesehatan", cols: ["ya", "tidak", "tidakTahu"] },
   { table: "SE_Ketenagakerjaan_JaminanKecelakaanKerja", cols: ["ya", "tidak", "tidakTahu"] },
   { table: "SE_Ketenagakerjaan_JaminanKematian", cols: ["ya", "tidak", "tidakTahu"] },
   { table: "SE_Ketenagakerjaan_JaminanHariTua", cols: ["ya", "tidak", "tidakTahu"] },
   { table: "SE_Ketenagakerjaan_JaminanPensiun", cols: ["ya", "tidak", "tidakTahu"] },
   { table: "SE_Ketenagakerjaan_Pengangguran", cols: ["value"] },
   { table: "SE_Transportasi_PermukaanJalanYgTerluas", cols: ["aspal", "diperkeras"] },
   { table: "SE_Transportasi_JalanDiLaluiKendaraan", cols: ["value"] },
   { table: "SE_Transportasi_Kecelakaan", cols: ["value"] },
   { table: "SE_Agama_RumahIbadah", cols: ["masjid", "gerejaKhatolik", "gerejaProtestan", "pura", "wihara", "kelenteng"] },
   { table: "SE_Pendidikan_JarakFasilitas", cols: ["sd", "smp", "smk", "sma"], decimal: true },
   { table: "SE_Pendidikan_JalanKakiKurangEmpatJam", cols: ["value"] },
   { table: "SE_Pendidikan_GuruTersertifikasi", cols: ["value"] },
   { table: "SE_Pendidikan_GuruHonorer", cols: ["value"] },
   { table: "SE_Kesehatan_KelasIbuHamil", cols: ["ya", "tidakAda"] },
   { table: "SE_Kesehatan_IbuHamilDariKeluargaMiskin", cols: ["ya", "tidakAda"] },
   { table: "SE_Kesehatan_JaminanUntukBaduta", cols: ["ya", "tidak"] },
   { table: "SE_Kesehatan_PosPelayanan", cols: ["terpadu", "aktif"] },
   { table: "SE_Kesehatan_Fasilitas", cols: ["rumahSakit", "rumahBersalin", "rumahSakitBersalin", "bidan", "apotek", "puskesmasDgRawatInap", "puskesmasTnpRawatInap"] },
   { table: "SE_Kesehatan_RataRataJarakFasilitas", cols: ["bidan", "puskesmasTanpaRawatInap", "puskesmasDgRawatInap", "rumahSakit"], decimal: true },
   { table: "SE_Kesehatan_JumlahDokter", cols: ["pria", "wanita"] },
   { table: "SE_Keamanan_Perkelahian", cols: ["menurun", "meningkat"] },
   { table: "SE_Keamanan_Pencurian", cols: ["menurun", "meningkat"] },
   { table: "SE_Keamanan_PencurianDanKekerasan", cols: ["menurun", "meningkat"] },
   { table: "SE_Keamanan_PenipuanDanPenggelapan", cols: ["menurun", "meningkat"] },
   { table: "SE_Keamanan_Penganiayaan", cols: ["menurun", "meningkat"] },
   { table: "SE_Keamanan_Perkosaan", cols: ["menurun", "meningkat"] },
   { table: "SE_Keamanan_Narkoba", cols: ["menurun", "meningkat"] },
   { table: "SE_Ekonomi_JumlahPasar", cols: ["bangunanPermanen", "bangunanSemiPermanen", "tanpaBangunan"] },
   { table: "SE_Ekonomi_LembagaKeuangan", cols: ["bankUmumPemerintah", "bankUmumSwasta", "bankPengkreditanRakyat", "koperasiSimpanPinjam"] },
   { table: "SE_Pertanian_JenisPrasaranaTransportasi", cols: ["diperkeras", "aspal", "tidakTerdefinisi", "tanah"] },
   { table: "SE_Pertanian_Irigasi", cols: ["ya", "tidak"] },
   { table: "SE_Kemiskinan_Data", cols: ["value"] },
   { table: "SE_Kemiskinan_BPJS", cols: ["value"] },
]

// batas atas hasil penjumlahan grafik: maksimal 2 digit (<= 99)
const TARGET_MIN = 18
const TARGET_MAX = 85

function shuffle<T>(arr: T[]) {
   const a = [...arr]
   for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
   }
   return a
}

/**
 * Target penjumlahan per kategori: nilai berbeda-beda yang tersebar pada rentang
 * [TARGET_MIN, TARGET_MAX] lalu diacak urutannya. Karena target tiap kategori
 * berbeda (dan konsisten untuk seluruh baris dalam cakupan), grafik yang
 * menjumlahkan baris akan naik-turun, bukan rata.
 */
function spreadTargets(n: number) {
   if (n <= 1) return [TARGET_MIN + Math.round(Math.random() * (TARGET_MAX - TARGET_MIN))]
   const step = (TARGET_MAX - TARGET_MIN) / (n - 1)
   const base = Array.from({ length: n }, (_, i) => {
      const jitter = (Math.random() * 2 - 1) * step * 0.3
      return Math.round(TARGET_MIN + step * i + jitter)
   })
   return shuffle(base)
}

/**
 * Generate data dummy untuk SELURUH tabel DATA SOSIAL EKONOMI sekaligus dalam satu
 * aksi. Nilai per baris = target/jumlah-baris (dengan jitter kecil yang menjaga
 * total), sehingga hasil PENJUMLAHAN pada grafik maksimal 2 digit (<= 99) dan tiap
 * kategori punya tinggi berbeda (naik-turun). Overwrite di tempat (UPDATE), bukan
 * hapus+buat.
 * @param idProvinsi wajib; idKabkot & idKecamatan opsional untuk mempersempit cakupan
 * @returns jumlah tabel dan total baris yang diperbarui
 */
export default async function funGenerateDataSosialEkonomi({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number, idKecamatan?: number }) {
   const useKab = Boolean(idKabkot && idKabkot > 0)
   const useKec = Boolean(idKecamatan && idKecamatan > 0)

   let whereSql = `"idProvinsi" = $1`
   const params: any[] = [idProvinsi]
   if (useKab) {
      params.push(idKabkot)
      whereSql += ` AND "idKabkot" = $${params.length}`
   }
   if (useKec) {
      params.push(idKecamatan)
      whereSql += ` AND "idKecamatan" = $${params.length}`
   }

   let rows = 0
   for (const t of SE_TABLES) {
      const targets = spreadTargets(t.cols.length)
      const dp = t.decimal ? 1 : 2
      const setParts = t.cols.map((c, i) =>
         `"${c}" = round((${targets[i]}::numeric / g.cnt) * (0.8 + random() * 0.4)::numeric, ${dp})`
      ).join(", ")

      const sql = `
         UPDATE "${t.table}" AS p
         SET ${setParts}, "updatedAt" = now()
         FROM (
            SELECT count(*)::int AS cnt FROM "${t.table}" WHERE ${whereSql}
         ) AS g
         WHERE ${whereSql}
      `
      rows += await prisma.$executeRawUnsafe(sql, ...params)
   }

   revalidatePath("dashboard/se")

   return { tables: SE_TABLES.length, rows }
}
