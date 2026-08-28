"use server"
import prisma from "@/modules/_global/bin/prisma"
import { revalidatePath } from "next/cache"
import _ from "lodash"

const CATEGORIES = ["pendidikan", "infrastruktur", "layananKesehatan", "kemiskinan", "keadilanSosial", "lapanganPekerjaan"]

// Target TOTAL per kategori setelah dijumlahkan di grafik (bukan nilai per baris).
// Grafik menjumlahkan seluruh baris kelurahan dalam satu wilayah, jadi nilai per baris
// dinormalisasi = target / jumlah baris. Dengan begitu tinggi batang tetap mendekati
// angka target ini berapa pun jumlah kelurahannya -> selalu maksimal 4 digit (<= 9999).
const TIER_TOTAL = [900, 1900, 3000, 4100, 5100, 6000]

function shuffle<T>(arr: T[]) {
   const a = [...arr]
   for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
   }
   return a
}

/**
 * Generate data dummy TREN PERHATIAN PUBLIK untuk wilayah terpilih.
 * Pemetaan target kategori DIACAK PER KABUPATEN sehingga bentuk grafik tiap daerah
 * berbeda (kategori dominan tidak sama), bukan hanya beda tinggi. Nilai per baris
 * dinormalisasi terhadap jumlah baris per kabupaten agar hasil penjumlahan pada
 * grafik selalu maksimal 4 digit (<= 9999).
 * @param idProvinsi wajib, idKabkot & idKecamatan opsional untuk mempersempit cakupan
 * @returns jumlah baris yang diperbarui
 */
export default async function funGenerateDataPct({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number, idKecamatan?: number }) {
   // daftar kabupaten dalam cakupan
   const where: any = { idProvinsi }
   if (idKabkot && idKabkot > 0) where.idKabkot = idKabkot
   if (idKecamatan && idKecamatan > 0) where.idKecamatan = idKecamatan

   const rows = await prisma.publicConcernTrendFix.findMany({ where, select: { idKabkot: true } })
   const kabkotList = _.uniq(rows.map((r) => r.idKabkot).filter((v): v is number => v != null))

   const useKecamatan = Boolean(idKecamatan && idKecamatan > 0)

   let count = 0
   for (const kab of kabkotList) {
      // shape acak per kabupaten + faktor magnitudo per kabupaten
      const tiers = shuffle(TIER_TOTAL)
      const factor = 0.7 + Math.random() * 0.6

      const setParts = CATEGORIES.map((cat, i) => {
         const target = Math.round(tiers[i] * factor)
         return `"${cat}" = greatest(1, round(${target} / g.cnt * (0.85 + random() * 0.3))::int)`
      }).join(", ")

      const extra = useKecamatan ? ` AND "idKecamatan" = $2` : ""
      const params: any[] = useKecamatan ? [kab, idKecamatan] : [kab]

      const sql = `
         UPDATE "PublicConcernTrendFix" AS p
         SET ${setParts}, "updatedAt" = now()
         FROM (
            SELECT count(*)::int AS cnt
            FROM "PublicConcernTrendFix"
            WHERE "idKabkot" = $1${extra}
         ) AS g
         WHERE p."idKabkot" = $1${extra}
      `

      count += await prisma.$executeRawUnsafe(sql, ...params)
   }

   revalidatePath('dashboard/public-concern-trend')

   return { count }
}
