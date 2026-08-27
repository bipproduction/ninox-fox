'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment"

export default async function funCekPairingBatch({ pairs, dates }: { pairs: { c1: string, c2: string }[], dates: string[] }) {
   const c1List = _.uniq(pairs.map(p => p.c1))
   const c2List = _.uniq(pairs.map(p => p.c2))
   const pairKeys = new Set(pairs.map(p => `${p.c1}_${p.c2}`))

   const data = await prisma.candidatePairing.findMany({
      where: {
         idCandidate1: { in: c1List },
         idCandidate2: { in: c2List },
         dateEmotion: { in: dates.map(d => new Date(d)) }
      },
      select: { idCandidate1: true, idCandidate2: true, dateEmotion: true }
   })

   const matched = data.filter((d) => pairKeys.has(`${d.idCandidate1}_${d.idCandidate2}`))
   const uniquePairs = _.uniqBy(matched, (d) => `${d.idCandidate1}_${d.idCandidate2}_${moment(d.dateEmotion).format('YYYY-MM-DD')}`)

   return { ada: uniquePairs.length > 0, count: uniquePairs.length }
}
