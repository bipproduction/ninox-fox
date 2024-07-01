"use server"
import prisma from "@/modules/_global/bin/prisma"
import { funGetUserDefaultFront } from "@/modules/user"
import _ from "lodash"
import moment from "moment"

export default async function funGetMlAiFrontV2({ candidate, date, time }: { candidate?: any, date: any, time?: any }) {

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

   let candidateReal = null

   if (_.isNull(candidate) || _.isUndefined(candidate)) {
      candidateReal = can?.id
   } else {
      candidateReal = candidate
   }

   if (candidateReal == null) {
      const allData = {
         dataJam: [],
         isJam: '',
         data: []
      }
      return allData
   } else {

      let jamFix, isoDateTime, kondisi
      const jamNow = new Date().getHours() + 1 + ':00:00'

      if (moment(date).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')) {
         const IniisoDateTime = new Date(new Date('1970-01-01 ' + jamNow).getTime() - (new Date('1970-01-01 ' + jamNow).getTimezoneOffset() * 60000)).toISOString();
         kondisi = {
            isActive: true,
            idCandidate: candidateReal,
            dateContent: date,
            timeContent: {
               lt: IniisoDateTime
            }
         }
      } else {
         kondisi = {
            isActive: true,
            idCandidate: candidateReal,
            dateContent: date,
         }
      }


      const dataJam = await prisma.mlAi.findMany({
         where: kondisi,
         orderBy: {
            timeContent: 'desc'
         }
      })

      const dataJamFix = _.map(_.groupBy(dataJam, "timeContent"), (v: any, i: any) => ({
         timeContent: v[0].timeContent
      }))

      const formatJam = dataJamFix.map((v: any) => ({
         ..._.omit(v, ["timeContent"]),
         timeContent: moment.utc(v.timeContent).format('HH:mm')
      }))

      if (dataJamFix.length > 0) {
         if (time != null) {
            jamFix = time
            jamFix = new Date('1970-01-01 ' + jamFix);
            isoDateTime = new Date(jamFix.getTime() - (jamFix.getTimezoneOffset() * 60000)).toISOString();
         } else {
            jamFix = dataJamFix[0].timeContent
            isoDateTime = dataJamFix[0].timeContent
         }
      }

      const dataEffect = await prisma.mlAi.findMany({
         where: {
            idCandidate: candidateReal,
            isActive: true,
            dateContent: date,
            timeContent: isoDateTime,
         },
         select: {
            id: true,
            idCandidate: true,
            idRequestMlAi: true,
            category: true,
            content: true,
            dateContent: true,
            timeContent: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            MlAiRequest: {
               select: {
                  request: true
               }
            }
         }
      })


      const resultDataEffect = dataEffect.map((v: any) => ({
         ..._.omit(v, ["MlAiRequest"]),
         request: v.MlAiRequest?.request
      }))


      const allData = {
         dataJam: formatJam,
         isJam: moment.utc(jamFix).format('HH:mm'),
         data: resultDataEffect,
      }

      return allData

   }

}