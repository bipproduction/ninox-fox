"use server"
import prisma from "@/modules/_global/bin/prisma"

/**
 * Cek apakah pada wilayah terpilih sudah ada data audience yang terisi (value/valueFilteredMax > 0).
 * Digunakan untuk konfirmasi overwrite sebelum generate.
 * @returns total baris, jumlah baris terisi, dan flag ada
 */
export default async function funCekAudienceBatch({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number, idKecamatan?: number }) {
   const where = (idKecamatan && idKecamatan > 0)
      ? { idKecamatan }
      : (idKabkot && idKabkot > 0)
         ? { idKabkot }
         : { idProvinsi }

   const total = await prisma.audience.count({ where })
   const filled = await prisma.audience.count({
      where: {
         ...where,
         OR: [{ value: { gt: 0 } }, { valueFilteredMax: { gt: 0 } }]
      }
   })

   return { total, filled, ada: filled > 0 }
}
