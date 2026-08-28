'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment"

/**
 * Cek keberadaan data ML-AI pada kombinasi kandidat × tanggal untuk peringatan overwrite.
 * @returns ada (boolean) & count (jumlah kombinasi kandidat+tanggal yang sudah terisi)
 */
export default async function funCekMlAiBatch({ candidates, dates }: { candidates: string[], dates: string[] }) {
   const data = await prisma.mlAi.findMany({
      where: {
         idCandidate: { in: candidates },
         dateContent: { in: dates.map(d => new Date(moment(d).format('YYYY-MM-DD'))) }
      },
      select: { idCandidate: true, dateContent: true }
   })

   const uniquePairs = _.uniqBy(data, (d) => `${d.idCandidate}_${moment(d.dateContent).format('YYYY-MM-DD')}`)

   return { ada: uniquePairs.length > 0, count: uniquePairs.length }
}
