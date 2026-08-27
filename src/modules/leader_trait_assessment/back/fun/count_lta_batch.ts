'use server'
import prisma from "@/modules/_global/bin/prisma"

export default async function funCountLtaBatch({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number | null, idKecamatan?: number | null }) {
   const where: any = { idProvinsi }
   if (idKabkot) where.idKabkot = idKabkot
   if (idKecamatan) where.idKecamatan = idKecamatan

   const count = await prisma.leaderTraitAssessmentFix.count({ where })

   return { count }
}
