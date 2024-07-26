'use server'
import prisma from "@/modules/_global/bin/prisma"
import moment from "moment"

export default async function funDelPairing({ can1, can2, dateCan }: { can1: any, can2: any, dateCan: any }) {

   const cek = await prisma.candidatePairing.count({
      where: {
         idCandidate1: can1,
         idCandidate2: can2,
         dateEmotion: new Date(moment(dateCan).format("YYYY-MM-DD")),
      }
   })

   const data = await prisma.candidatePairing.deleteMany({
      where: {
         idCandidate1: can1,
         idCandidate2: can2,
         dateEmotion: new Date(moment(dateCan).format("YYYY-MM-DD")),
      }
   })

   return {
      success: true,
      available: cek > 0 ? true : false
   }

}