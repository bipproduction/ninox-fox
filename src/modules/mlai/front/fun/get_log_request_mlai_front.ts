'use server'
import prisma from '@/modules/_global/bin/prisma';
import { funGetUserByCookies } from '@/modules/auth';

// todo: belom default wilayah
export default async function funGetLogRequestMlaiFront({page}:{page:any}) {
   const user = await funGetUserByCookies()
   const dataTake = page * 15
   const data = await prisma.mlAiRequest.findMany({
      skip: 0,
      take: dataTake,
      where: {
         idUser: user?.id
      },
      orderBy: {
         createdAt: 'desc'
      }
   })

   return data
}