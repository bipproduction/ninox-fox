'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment"

export default async function funCekEmotionBatch({ candidates, dates }: { candidates: string[], dates: string[] }) {
   const data = await prisma.candidateEmotion.findMany({
      where: {
         idCandidate: { in: candidates },
         dateEmotion: { in: dates.map(d => new Date(d)) }
      },
      select: { idCandidate: true, dateEmotion: true }
   })

   const uniquePairs = _.uniqBy(data, (d) => `${d.idCandidate}_${moment(d.dateEmotion).format('YYYY-MM-DD')}`)

   return { ada: uniquePairs.length > 0, count: uniquePairs.length }
}
