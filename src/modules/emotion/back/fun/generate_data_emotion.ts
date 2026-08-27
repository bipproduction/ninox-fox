'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment"

function getRandomIntInclusive(min: number, max: number) {
   const minCeil = Math.ceil(min)
   const maxFloor = Math.floor(max)
   return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil
}

function randomNumbersWithFixedSum(quantity: number, sum: number) {
   const result = [];
   let total = 0;

   for (let i = 0; i < quantity - 1; i++) {
      let max = sum - total;
      let num = getRandomIntInclusive(0, max);
      result.push(num);
      total += num;
   }
   result.push(sum - total);

   return result;
}

function clamp(val: number, min: number, max: number) {
   return Math.max(min, Math.min(max, val))
}

function generateWaveSeries(length: number) {
   const series: { positif: number, netral: number, negatif: number }[] = []

   let positif = getRandomIntInclusive(35, 55)
   let netral = getRandomIntInclusive(20, Math.min(35, 90 - positif))

   for (let i = 0; i < length; i++) {
      if (i > 0) {
         positif = clamp(positif + getRandomIntInclusive(-6, 6), 20, 70)
         netral = clamp(netral + getRandomIntInclusive(-4, 4), 10, 40)
      }

      let negatif = 100 - positif - netral
      if (negatif < 5) {
         negatif = 5
         netral = 100 - positif - negatif
      }

      series.push({ positif, netral, negatif })
   }

   return series
}

async function generateOne({ candidate, date, positif, netral, negatif }: { candidate: string, date: string, positif: any, netral: any, negatif: any }) {
   const dateEmotion = new Date(moment(date).format('YYYY-MM-DD'))

   await prisma.candidateEmotion.deleteMany({
      where: { idCandidate: candidate, dateEmotion }
   })

   const dataCandidate = await prisma.candidate.findUnique({
      where: {
         id: candidate
      }
   })

   let kondisi: any = {
      idKabkot: dataCandidate?.idKabkot
   }

   if (dataCandidate?.tingkat == 1) {
      kondisi = {
         idProvinsi: dataCandidate?.idProvinsi
      }
   }

   const dataAudience = await prisma.audience.findMany({
      where: kondisi,
      orderBy: {
         idKecamatan: 'asc'
      }
   })

   const valueFiltered = _.map(_.groupBy(dataAudience, "idKecamatan"), (v: any, i: any) => ({
      idArea: v[0].idKecamatan,
      value: _.sumBy(v, 'value'),
      valueFilteredMax: _.sumBy(v, 'valueFilteredMax'),
      valuePositifPersen: _.floor(positif * _.sumBy(v, 'valueFilteredMax') / 100),
      valueNetralPersen: _.floor(netral * _.sumBy(v, 'valueFilteredMax') / 100),
      valueNegatifPersen: _.floor(negatif * _.sumBy(v, 'valueFilteredMax') / 100),
      valueSetPositif1: randomNumbersWithFixedSum(v.length, _.floor(_.floor(positif * _.sumBy(v, 'valueFilteredMax') / 100) / 2)),
      valueSetPositif2: randomNumbersWithFixedSum(v.length, _.floor(_.floor(positif * _.sumBy(v, 'valueFilteredMax') / 100) / 2)),
      valueSetNetral: randomNumbersWithFixedSum(v.length, _.floor(netral * _.sumBy(v, 'valueFilteredMax') / 100)),
      valueSetNegatif: randomNumbersWithFixedSum(v.length, _.floor(negatif * _.sumBy(v, 'valueFilteredMax') / 100))
   }))

   let nowIdKec = '', index = -1
   const dataOmit = dataAudience.map((v: any, i: any) => {
      const valuenya: any = valueFiltered.filter((i: any) => i.idArea === v.idKecamatan)
      if (nowIdKec != v.idKecamatan) {
         index = -1
         nowIdKec = v.idKecamatan
      }

      index++;

      return ({
         ..._.omit(v, ["idKelurahan", "idKecamatan", "idKabkot", "idProvinsi", "value", "valueFilteredMax", "createdAt", "updatedAt", "id", "isActive"]),
         dateEmotion,
         idCandidate: String(dataCandidate?.id),
         idProvinsi: v.idProvinsi,
         idKabkot: v.idKabkot,
         idKecamatan: v.idKecamatan,
         idKelurahan: v.idKelurahan,
         confidence: 0,
         supportive: valuenya[0].valueSetPositif1[index],
         positive: 0,
         undecided: valuenya[0].valueSetPositif2[index],
         unsupportive: 0,
         uncomfortable: valuenya[0].valueSetNetral[index],
         negative: 0,
         dissapproval: valuenya[0].valueSetNegatif[index]
      })

   }
   )

   await prisma.candidateEmotion.createMany({
      data: dataOmit
   })
}

export default async function funGenerateDataEmotion({ candidates, dates }: { candidates: string[], dates: string[] }) {

   for (const candidate of candidates) {
      const series = generateWaveSeries(dates.length)

      for (let i = 0; i < dates.length; i++) {
         const { positif, netral, negatif } = series[i]
         await generateOne({ candidate, date: dates[i], positif, netral, negatif })
      }
   }

   return {
      success: true,
      message: 'Sukses',
      processed: candidates.length * dates.length
   }

}
