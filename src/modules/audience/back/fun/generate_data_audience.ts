"use server"
import prisma from "@/modules/_global/bin/prisma"
import { revalidatePath } from "next/cache"

/**
 * Generate data dummy SUARA TERKUNCI (value) & MAKSIMAL SUARA TERFILTER (valueFilteredMax)
 * untuk seluruh baris audience pada wilayah terpilih.
 * SUARA TERKUNCI (value) dibuat jauh lebih besar dari MAKSIMAL SUARA TERFILTER (valueFilteredMax),
 * yaitu 4x - 9x lipatnya.
 * @param idProvinsi wajib, idKabkot & idKecamatan opsional untuk mempersempit cakupan
 * @returns jumlah baris yang diperbarui
 */
export default async function funGenerateDataAudience({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number, idKecamatan?: number }) {
   let count = 0

   if (idKecamatan && idKecamatan > 0) {
      count = await prisma.$executeRaw`
         UPDATE "Audience" AS a
         SET "value" = r.filt * r.mult, "valueFilteredMax" = r.filt, "updatedAt" = now()
         FROM (
            SELECT id, (floor(random() * 201) + 50)::int AS filt, (floor(random() * 6) + 4)::int AS mult
            FROM "Audience" WHERE "idKecamatan" = ${idKecamatan}
         ) AS r
         WHERE a.id = r.id`
   } else if (idKabkot && idKabkot > 0) {
      count = await prisma.$executeRaw`
         UPDATE "Audience" AS a
         SET "value" = r.filt * r.mult, "valueFilteredMax" = r.filt, "updatedAt" = now()
         FROM (
            SELECT id, (floor(random() * 201) + 50)::int AS filt, (floor(random() * 6) + 4)::int AS mult
            FROM "Audience" WHERE "idKabkot" = ${idKabkot}
         ) AS r
         WHERE a.id = r.id`
   } else {
      count = await prisma.$executeRaw`
         UPDATE "Audience" AS a
         SET "value" = r.filt * r.mult, "valueFilteredMax" = r.filt, "updatedAt" = now()
         FROM (
            SELECT id, (floor(random() * 201) + 50)::int AS filt, (floor(random() * 6) + 4)::int AS mult
            FROM "Audience" WHERE "idProvinsi" = ${idProvinsi}
         ) AS r
         WHERE a.id = r.id`
   }

   revalidatePath('dashboard/audience')

   return { count }
}
