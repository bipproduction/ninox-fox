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

/**
 * Karakter sentimen sebuah daerah: proporsi positif/netral/negatif (total 100) dengan
 * salah satu kategori sengaja dibuat dominan secara acak. Dipakai agar tiap daerah punya
 * bentuk grafik ANALISIS SENTIMEN yang berbeda (bukan selalu negatif dominan).
 */
function randomCharacter() {
   const dom = getRandomIntInclusive(0, 2) // 0 = positif, 1 = netral, 2 = negatif
   let positif = 0, netral = 0, negatif = 0

   if (dom === 0) {
      positif = getRandomIntInclusive(50, 64)
      netral = getRandomIntInclusive(16, 90 - positif - 8)
      negatif = 100 - positif - netral
   } else if (dom === 1) {
      netral = getRandomIntInclusive(46, 58)
      positif = getRandomIntInclusive(18, 90 - netral - 8)
      negatif = 100 - positif - netral
   } else {
      negatif = getRandomIntInclusive(50, 64)
      positif = getRandomIntInclusive(16, 90 - negatif - 8)
      netral = 100 - positif - negatif
   }

   return { positif, netral, negatif }
}

async function generateOne({ dataCandidate, dataAudience, date, wave, characterByGroup, useKec }: { dataCandidate: any, dataAudience: any[], date: string, wave: { positif: number, netral: number, negatif: number }, characterByGroup: Record<string, { positif: number, netral: number, negatif: number }>, useKec: boolean }) {
   const dateEmotion = new Date(moment(date).format('YYYY-MM-DD'))

   await prisma.candidateEmotion.deleteMany({
      where: { idCandidate: String(dataCandidate?.id), dateEmotion }
   })

   // profil harian per grup: karakter daerah (stabil) + sedikit drift dari wave harian
   const profileByGroup: Record<string, { positif: number, netral: number, negatif: number }> = {}
   for (const g of Object.keys(characterByGroup)) {
      const ch = characterByGroup[g]
      let positif = Math.round(0.7 * ch.positif + 0.3 * wave.positif)
      let netral = Math.round(0.7 * ch.netral + 0.3 * wave.netral)
      let negatif = 100 - positif - netral
      if (negatif < 5) {
         negatif = 5
         netral = 100 - positif - negatif
      }
      profileByGroup[g] = { positif, netral, negatif }
   }

   const valueFiltered = _.map(_.groupBy(dataAudience, "idKecamatan"), (v: any) => {
      const groupKey = String(useKec ? v[0].idKecamatan : v[0].idKabkot)
      const prof = profileByGroup[groupKey] ?? { positif: 34, netral: 33, negatif: 33 }
      const sumFilt = _.sumBy(v, 'valueFilteredMax')
      const pos = _.floor(prof.positif * sumFilt / 100)
      const net = _.floor(prof.netral * sumFilt / 100)
      const neg = _.floor(prof.negatif * sumFilt / 100)

      return {
         idArea: v[0].idKecamatan,
         valueSetPositif1: randomNumbersWithFixedSum(v.length, _.floor(pos / 2)),
         valueSetPositif2: randomNumbersWithFixedSum(v.length, _.floor(pos / 2)),
         valueSetNetral: randomNumbersWithFixedSum(v.length, net),
         valueSetNegatif: randomNumbersWithFixedSum(v.length, neg)
      }
   })

   let nowIdKec = '', index = -1
   const dataOmit = dataAudience.map((v: any) => {
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
      const dataCandidate = await prisma.candidate.findUnique({ where: { id: candidate } })

      const kondisi: any = dataCandidate?.tingkat == 1
         ? { idProvinsi: dataCandidate?.idProvinsi }
         : { idKabkot: dataCandidate?.idKabkot }

      const dataAudience = await prisma.audience.findMany({
         where: kondisi,
         orderBy: { idKecamatan: 'asc' }
      })

      // grup pembeda grafik: kabupaten utk tingkat 1, kecamatan utk tingkat 2
      const useKec = dataCandidate?.tingkat == 2
      const groups = _.uniq(dataAudience.map((v: any) => (useKec ? v.idKecamatan : v.idKabkot)))

      // karakter sentimen per daerah, stabil untuk seluruh rentang tanggal
      const characterByGroup: Record<string, { positif: number, netral: number, negatif: number }> = {}
      for (const g of groups) {
         characterByGroup[String(g)] = randomCharacter()
      }

      const series = generateWaveSeries(dates.length)

      for (let i = 0; i < dates.length; i++) {
         await generateOne({ dataCandidate, dataAudience, date: dates[i], wave: series[i], characterByGroup, useKec })
      }
   }

   return {
      success: true,
      message: 'Sukses',
      processed: candidates.length * dates.length
   }

}
