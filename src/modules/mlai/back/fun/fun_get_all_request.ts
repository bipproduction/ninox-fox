'use server'
import prisma from "@/modules/_global/bin/prisma"
import _, { ceil, orderBy } from "lodash";
import moment from "moment";

export default async function funGetAllRequestMlai({ page, status, search, sort }: { page: any, status: any, search?: any, sort?: any }) {
   const dataSkip = _.toNumber(page) * 25 - 25;
   let trueSort, fieldSort, orderSort

   if (sort != '' && sort != null && sort != undefined) {
      trueSort = sort
   } else {
      trueSort = 'baru'
   }

   if (trueSort == 'userAZ' || trueSort == 'lama') {
      orderSort = 'asc'
   } else if (trueSort == 'userZA' || trueSort == 'baru') {
      orderSort = 'desc'
   }

   const dataSelect = {
      id: true,
      request: true,
      status: true,
      createdAt: true,
      idCandidate: true,
      idUser: true,
      User: {
         select: {
            name: true,
         }
      },
      MlAi: {
         select: {
            id: true,
            content: true,
         }
      }
   }

   const nData = await prisma.mlAiRequest.count({
      where: {
         isActive: true,
         status: status,
         request: {
            contains: search,
            mode: 'insensitive'
         }
      }
   })

   if (trueSort != "NRequestTR" && trueSort != "NRequestRT") {
      let data: any[] = []
      if (trueSort == 'baru' || trueSort == 'lama') {
         data = await prisma.mlAiRequest.findMany({
            skip: dataSkip,
            take: 25,
            where: {
               isActive: true,
               status: status,
               request: {
                  contains: search,
                  mode: 'insensitive'
               }
            },
            select: dataSelect,
            orderBy: {
               createdAt: (orderSort == 'asc') ? 'asc' : 'desc'
            }
         })
      } else if (trueSort == 'userAZ' || trueSort == 'userZA') {
         data = await prisma.mlAiRequest.findMany({
            skip: dataSkip,
            take: 25,
            where: {
               isActive: true,
               status: status,
               request: {
                  contains: search,
                  mode: 'insensitive'
               }
            },
            select: dataSelect,
            orderBy: {
               User: {
                  name: (orderSort == 'asc') ? 'asc' : 'desc'
               }
            }
         })
      }



      const result = data.map((v: any) => ({
         ..._.omit(v, ['User', 'createdAt', 'MlAi']),
         name: v.User.name,
         date: moment(v.createdAt).format('LLL'),
         response: v.MlAi[0]?.content,
         idMlAi: v.MlAi[0]?.id
      }))


      const allData = {
         data: result,
         total: nData,
         nPage: ceil(nData / 25)
      }

      return allData


   } else {
      const data = await prisma.mlAiRequest.findMany({
         where: {
            isActive: true,
            status: status,
            request: {
               contains: search,
               mode: 'insensitive'
            }
         },
         select: dataSelect
      })

      const result = data.map((v: any) => ({
         ..._.omit(v, ['User', 'createdAt', 'MlAi']),
         name: v.User.name,
         date: moment(v.createdAt).format('LLL'),
         response: v.MlAi[0]?.content,
         idMlAi: v.MlAi[0]?.id
      }))

      const dataGroup = _.map(_.groupBy(result, "idUser"), (v: any) => ({
         count: result.filter((i: any) => i.idUser === v[0].idUser).length,
         name: v[0].name,
         idUser: v[0].idUser
      }))


      const sortData = _.orderBy(dataGroup, "count", trueSort == "NRequestTR" ? 'desc' : 'asc').map((v, i) => (
         result.filter((i: any) => i.idUser === v.idUser)
      ))

      const realData = sortData.flat()
      const end = dataSkip + 25;
      const selectPage = _.slice(realData, dataSkip, end)

      const allData = {
         data: selectPage,
         total: nData,
         nPage: ceil(nData / 25)
      }

      return allData
   }
}