'use server'
import prisma from "@/modules/_global/bin/prisma"
import { funGetUserDefaultFront } from "@/modules/user"
import _ from "lodash"

export default async function funGetEmotionRegionalInsightNew({ candidate }: { candidate?: any }) {
   const def = await funGetUserDefaultFront()
   const can = await prisma.candidate.findFirst({
      where: {
         isActive: true,
         idProvinsi: Number(def.idProvinsi),
         idKabkot: def.idKabkot,
         tingkat: def.tingkat
      },
      select: {
         id: true,
      },
      orderBy: {
         name: 'asc'
      }
   })

   let candidateReal = null, format, result = null

   if (candidate == null) {
      if (def.idCandidate != null) {
         candidateReal = def.idCandidate
      } else {
         candidateReal = can?.id
      }
   } else {
      candidateReal = candidate
   }

   if (candidateReal == null) {
      return null
   } else {
      const dataC = await prisma.candidate.findUnique({
         where: {
            id: candidateReal,
            isActive: true,
         }
      })

      const data = await prisma.candidateEmotion.findMany({
         where: {
            dateEmotion: new Date(),
            idCandidate: candidateReal,
            isActive: true,
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
            idProvinsi: true,
            idKabkot: true,
            AreaKabkot: {
               select: {
                  name: true,
               }
            },
            idKecamatan: true,
            AreaKecamatan: {
               select: {
                  name: true
               }
            }
         }
      })

      if (dataC?.tingkat == 2) {
         format = data.map((v: any) => ({
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

      } else if (dataC?.tingkat == 1) {
         format = data.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot"]),
            name: v.AreaKabkot.name
         }))

         result = _.map(_.groupBy(format, "idKabkot"), (v: any) => ({
            name: _.toString(v[0].name),
            id: v[0].idKabkot,
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
      }

      return result
   }
}