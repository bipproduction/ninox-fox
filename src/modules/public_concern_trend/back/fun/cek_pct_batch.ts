"use server"
import prisma from "@/modules/_global/bin/prisma"

/**
 * Cek apakah pada wilayah terpilih sudah ada data TREN PERHATIAN PUBLIK yang terisi
 * (salah satu kategori > 0). Digunakan untuk konfirmasi overwrite sebelum generate.
 * @returns total baris, jumlah baris terisi, dan flag ada
 */
export default async function funCekPctBatch({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number, idKecamatan?: number }) {
   const where = (idKecamatan && idKecamatan > 0)
      ? { idKecamatan }
      : (idKabkot && idKabkot > 0)
         ? { idKabkot }
         : { idProvinsi }

   const total = await prisma.publicConcernTrendFix.count({ where })
   const filled = await prisma.publicConcernTrendFix.count({
      where: {
         ...where,
         OR: [
            { pendidikan: { gt: 0 } },
            { infrastruktur: { gt: 0 } },
            { layananKesehatan: { gt: 0 } },
            { kemiskinan: { gt: 0 } },
            { keadilanSosial: { gt: 0 } },
            { lapanganPekerjaan: { gt: 0 } },
         ]
      }
   })

   return { total, filled, ada: filled > 0 }
}
