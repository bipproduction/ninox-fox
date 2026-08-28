"use server"
import prisma from "@/modules/_global/bin/prisma"

/**
 * Cek cakupan wilayah untuk generate DATA SOSIAL EKONOMI. Seluruh tabel SE memiliki
 * set baris yang sama (satu baris per kecamatan), jadi satu tabel dipakai sebagai
 * perwakilan: `total` = jumlah baris per tabel, `filled` = baris yang sudah terisi
 * (dipakai untuk peringatan overwrite sebelum generate).
 */
export default async function funCekSeBatch({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number, idKecamatan?: number }) {
   const where = (idKecamatan && idKecamatan > 0)
      ? { idKecamatan }
      : (idKabkot && idKabkot > 0)
         ? { idKabkot }
         : { idProvinsi }

   const total = await prisma.sE_Ketenagakerjaan_JaminanKesehatan.count({ where })
   const filled = await prisma.sE_Ketenagakerjaan_JaminanKesehatan.count({
      where: {
         ...where,
         OR: [
            { ya: { gt: 0 } },
            { tidak: { gt: 0 } },
            { tidakTahu: { gt: 0 } },
         ]
      }
   })

   return { total, filled, ada: filled > 0 }
}
