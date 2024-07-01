'use server'
import { funGetOneKabkot, funGetOneKecamatan } from "@/modules/_global"
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

export default async function funGetEmotionDetailRegionalNew({ candidate, area }: { candidate: any, area: any }) {
   let result = null, dataArea

   const dataC = await prisma.candidate.findUnique({
      where: {
         id: candidate,
         isActive: true,
      }
   })

   if (dataC?.tingkat == 1) {
      const data = await prisma.candidateEmotion.findMany({
         where: {
            dateEmotion: new Date(),
            idCandidate: candidate,
            isActive: true,
            idKabkot: Number(area)
         },
         select: {
            confidence: true,
            dissapproval: true,
            negative: true,
            positive: true,
            supportive: true,
            uncomfortable: true,
            undecided: true,
            unsupportive: true,
            idKecamatan: true,
            AreaKecamatan: {
               select: {
                  name: true
               }
            }
         }
      })

      const format = data.map((v: any) => ({
         ..._.omit(v, ["AreaKecamatan"]),
         name: v.AreaKecamatan.name
      }))

      result = _.map(_.groupBy(format, "idKecamatan"), (v: any) => ({
         name: _.toString(v[0].name),
         id: v[0].idKecamatan,
         mendukung: _.sumBy(v, 'confidence') + _.sumBy(v, 'supportive'),
         mempertimbangkan: _.sumBy(v, 'positive') + _.sumBy(v, 'undecided'),
         tidaktahu: _.sumBy(v, 'unsupportive') + _.sumBy(v, 'uncomfortable'),
         tidakmendukung: _.sumBy(v, 'dissapproval') + _.sumBy(v, 'negative'),
         filtered: _.sum([
            _.sumBy(v, 'confidence'),
            _.sumBy(v, 'dissapproval'),
            _.sumBy(v, 'negative'),
            _.sumBy(v, 'positive'),
            _.sumBy(v, 'supportive'),
            _.sumBy(v, 'uncomfortable'),
            _.sumBy(v, 'undecided'),
            _.sumBy(v, 'unsupportive'),
         ])
      }))

      dataArea = await funGetOneKabkot({ id: area })

   } else if (dataC?.tingkat == 2) {
      const data = await prisma.candidateEmotion.findMany({
         where: {
            dateEmotion: new Date(),
            idCandidate: candidate,
            isActive: true,
            idKecamatan: Number(area)
         },
         select: {
            confidence: true,
            dissapproval: true,
            negative: true,
            positive: true,
            supportive: true,
            uncomfortable: true,
            undecided: true,
            unsupportive: true,
            idKelurahan: true,
            AreaKelurahan: {
               select: {
                  name: true
               }
            }
         }
      })

      const format = data.map((v: any) => ({
         ..._.omit(v, ["AreaKelurahan"]),
         name: v.AreaKelurahan.name
      }))

      result = _.map(_.groupBy(format, "idKelurahan"), (v: any) => ({
         name: _.toString(v[0].name),
         id: v[0].idKelurahan,
         mendukung: _.sumBy(v, 'confidence') + _.sumBy(v, 'supportive'),
         mempertimbangkan: _.sumBy(v, 'positive') + _.sumBy(v, 'undecided'),
         tidaktahu: _.sumBy(v, 'unsupportive') + _.sumBy(v, 'uncomfortable'),
         tidakmendukung: _.sumBy(v, 'dissapproval') + _.sumBy(v, 'negative'),
         filtered: _.sum([
            _.sumBy(v, 'confidence'),
            _.sumBy(v, 'dissapproval'),
            _.sumBy(v, 'negative'),
            _.sumBy(v, 'positive'),
            _.sumBy(v, 'supportive'),
            _.sumBy(v, 'uncomfortable'),
            _.sumBy(v, 'undecided'),
            _.sumBy(v, 'unsupportive'),
         ])
      }))

      dataArea = await funGetOneKecamatan({ id: area })
   }

   const allData = {
      area: dataArea?.name,
      data: result
   }

   return allData

}