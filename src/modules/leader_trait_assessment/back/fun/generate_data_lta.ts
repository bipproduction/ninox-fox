'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

function getRandomIntInclusive(min: number, max: number) {
   const minCeil = Math.ceil(min)
   const maxFloor = Math.floor(max)
   return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil
}

function randomNumbersWithFixedSum(quantity: number, sum: number) {
   const result = []
   let total = 0

   for (let i = 0; i < quantity - 1; i++) {
      const max = sum - total
      const num = getRandomIntInclusive(0, max)
      result.push(num)
      total += num
   }
   result.push(sum - total)

   return result
}

export default async function funGenerateDataLta({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number | null, idKecamatan?: number | null }) {
   const where: any = { idProvinsi }
   if (idKabkot) where.idKabkot = idKabkot
   if (idKecamatan) where.idKecamatan = idKecamatan

   const dataLta = await prisma.leaderTraitAssessmentFix.findMany({
      where,
      select: { id: true, idKelurahan: true }
   })

   const idKelurahanList = dataLta.map((v) => v.idKelurahan).filter((v): v is number => v != null)

   const dataAudience = await prisma.audience.findMany({
      where: { idKelurahan: { in: idKelurahanList } },
      select: { idKelurahan: true, valueFilteredMax: true }
   })

   const audienceByKelurahan = _.groupBy(dataAudience, "idKelurahan")

   for (const row of dataLta) {
      const totalMax = _.sumBy(audienceByKelurahan[String(row.idKelurahan)] || [], 'valueFilteredMax')
      const [pekerjaKeras, cerdas, jujur, merakyat, tegas, berpengalamanMemimpin, berprestasi, latarBelakangMiliter, agamis] = randomNumbersWithFixedSum(9, totalMax)

      await prisma.leaderTraitAssessmentFix.update({
         where: { id: row.id },
         data: { pekerjaKeras, cerdas, jujur, merakyat, tegas, berpengalamanMemimpin, berprestasi, latarBelakangMiliter, agamis }
      })
   }

   return {
      success: true,
      message: 'Sukses',
      processed: dataLta.length
   }
}
