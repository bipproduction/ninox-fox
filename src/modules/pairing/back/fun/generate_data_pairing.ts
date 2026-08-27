'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment"

function getRandomIntInclusive(min: number, max: number) {
   const minCeil = Math.ceil(min)
   const maxFloor = Math.floor(max)
   return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil
}

function clamp(val: number, min: number, max: number) {
   return Math.max(min, Math.min(max, val))
}

function splitTwo(total: number) {
   if (total <= 0) return [0, 0]
   const ratio = getRandomIntInclusive(35, 65)
   const first = _.floor(total * ratio / 100)
   return [first, total - first]
}

function generateWaveSeriesPairing(length: number) {
   const series: { mendukung: number, mempertimbangkan: number, tidaktahu: number, tidakmendukung: number }[] = []

   let mendukung = getRandomIntInclusive(30, 55)
   let mempertimbangkan = getRandomIntInclusive(15, Math.min(30, 90 - mendukung))
   let tidaktahu = getRandomIntInclusive(10, Math.min(25, 95 - mendukung - mempertimbangkan))

   for (let i = 0; i < length; i++) {
      if (i > 0) {
         mendukung = clamp(mendukung + getRandomIntInclusive(-6, 6), 20, 70)
         mempertimbangkan = clamp(mempertimbangkan + getRandomIntInclusive(-4, 4), 10, 35)
         tidaktahu = clamp(tidaktahu + getRandomIntInclusive(-3, 3), 5, 30)
      }

      let tidakmendukung = 100 - mendukung - mempertimbangkan - tidaktahu
      if (tidakmendukung < 5) {
         const shortfall = 5 - tidakmendukung
         tidakmendukung = 5
         tidaktahu = Math.max(5, tidaktahu - shortfall)
      }

      series.push({ mendukung, mempertimbangkan, tidaktahu, tidakmendukung })
   }

   return series
}

async function generateOne({ candidate1, candidate2, date, mendukung, mempertimbangkan, tidaktahu, tidakmendukung }: { candidate1: string, candidate2: string, date: string, mendukung: number, mempertimbangkan: number, tidaktahu: number, tidakmendukung: number }) {
   const dateEmotion = new Date(moment(date).format('YYYY-MM-DD'))

   await prisma.candidatePairing.deleteMany({
      where: { idCandidate1: candidate1, idCandidate2: candidate2, dateEmotion }
   })

   const dataCandidate1 = await prisma.candidate.findUnique({
      where: { id: candidate1 }
   })

   let kondisi: any = {
      idKabkot: dataCandidate1?.idKabkot
   }

   if (dataCandidate1?.tingkat == 1) {
      kondisi = {
         idProvinsi: dataCandidate1?.idProvinsi
      }
   }

   const dataAudience = await prisma.audience.findMany({
      where: kondisi,
      orderBy: {
         idKecamatan: 'asc'
      }
   })

   const rate = mendukung

   const dataInsert = _.map(_.groupBy(dataAudience, "idKecamatan"), (v: any) => {
      const totalMax = _.sumBy(v, 'valueFilteredMax')

      const mendukungCount = _.floor(mendukung * totalMax / 100)
      const mempertimbangkanCount = _.floor(mempertimbangkan * totalMax / 100)
      const tidaktahuCount = _.floor(tidaktahu * totalMax / 100)
      const tidakmendukungCount = _.floor(tidakmendukung * totalMax / 100)

      const [confidence, supportive] = splitTwo(mendukungCount)
      const [positive, undecided] = splitTwo(mempertimbangkanCount)
      const [unsupportive, uncomfortable] = splitTwo(tidaktahuCount)
      const [negative, dissapproval] = splitTwo(tidakmendukungCount)

      return {
         idCandidate1: candidate1,
         idCandidate2: candidate2,
         dateEmotion,
         idProvinsi: v[0].idProvinsi,
         idKabkot: v[0].idKabkot,
         idKecamatan: v[0].idKecamatan,
         rate,
         confidence,
         supportive,
         positive,
         undecided,
         unsupportive,
         uncomfortable,
         negative,
         dissapproval
      }
   })

   await prisma.candidatePairing.createMany({
      data: dataInsert
   })
}

export default async function funGenerateDataPairing({ pairs, dates }: { pairs: { c1: string, c2: string }[], dates: string[] }) {

   for (const pair of pairs) {
      const series = generateWaveSeriesPairing(dates.length)

      for (let i = 0; i < dates.length; i++) {
         const { mendukung, mempertimbangkan, tidaktahu, tidakmendukung } = series[i]
         await generateOne({ candidate1: pair.c1, candidate2: pair.c2, date: dates[i], mendukung, mempertimbangkan, tidaktahu, tidakmendukung })
      }
   }

   return {
      success: true,
      message: 'Sukses',
      processed: pairs.length * dates.length
   }
}
