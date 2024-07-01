'use server'
import prisma from "@/modules/_global/bin/prisma"

export default async function funGetCountPendingRequest() {
   const data = await prisma.mlAiRequest.count({
      where: {
         status: 0
      }
   })

   return data
}