'use server'
import prisma from "@/modules/_global/bin/prisma"
import moment from "moment"


export default async function funGetOneMlAiByRequest({ req, mlai }: { req: any, mlai: any }) {

   let kondisi

   if (req != null && req != undefined && req != "") {
      kondisi = {
         idRequestMlAi: req
      }
   } else {
      kondisi = {
         id: mlai
      }
   }


   const data = await prisma.mlAi.findFirst({
      where: kondisi
   })

   const dataFix = {
      id: data?.id,
      idRequestMlAi: data?.idRequestMlAi,
      content: data?.content,
      idCandidate: data?.idCandidate,
      dateContent: data?.dateContent,
      timeContent: moment.utc(data?.timeContent).format('HH:mm')
   }

   return dataFix
}