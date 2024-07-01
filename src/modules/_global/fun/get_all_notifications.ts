'use server'
import { funGetUserByCookies } from "@/modules/auth"
import prisma from "../bin/prisma"
import { funGetUserDefaultFront } from "@/modules/user"

export default async function funGetAllNotifications({ page }: { page: any }) {
   const user = await funGetUserByCookies()
   const can = await funGetUserDefaultFront()
   const userArea = await funGetUserDefaultFront()
   const dataSkip = Number(page) * 15 - 15;
   const dataTake = page * 15

   const dataPage = await prisma.notifications.findMany({
      skip: 0,
      take: dataTake,
      where: {
         OR: [
            {
               isActive: true,
               idUserClient: user?.id,
               idCandidate: can.idCandidate
            },
            {
               isActive: true,
               idUserClient: user?.id,
               idProvinsi: userArea.idProvinsi,
               idCandidate: null
            },
         ]
      },
      orderBy: [
         {
            isRead: 'asc'
         },
         {
            createdAt: 'desc'
         }
      ]
   })

   // const data = await prisma.notifications.findMany({
   //    where: {
   //       OR: [
   //          {
   //             isActive: true,
   //             isRead: false,
   //             idUserClient: user?.id,
   //             idCandidate: can.idCandidate
   //          },
   //          {
   //             isActive: true,
   //             isRead: false,
   //             idUserClient: user?.id,
   //             idProvinsi: userArea.idProvinsi,
   //             idCandidate: null
   //          },
   //       ]
   //    },
   //    orderBy: {
   //       createdAt: 'desc'
   //    }
   // })

   // const dataRead = await prisma.notifications.findMany({
   //    where: {
   //       OR: [
   //          {
   //             isActive: true,
   //             isRead: true,
   //             idUserClient: user?.id,
   //             idCandidate: can.idCandidate
   //          },
   //          {
   //             isActive: true,
   //             isRead: true,
   //             idUserClient: user?.id,
   //             idProvinsi: userArea.idProvinsi,
   //             idCandidate: null
   //          },
   //       ]
   //    },
   //    orderBy: {
   //       createdAt: 'desc'
   //    }
   // })


   const allData = {
      // trueRead: dataRead,
      // falseRead: data
      trueRead: dataPage.filter((i: any) => i.isRead === true),
      falseRead: dataPage.filter((i: any) => i.isRead === false),
   }


   return dataPage
}