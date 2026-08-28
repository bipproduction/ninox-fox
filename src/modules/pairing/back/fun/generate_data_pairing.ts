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

type Profile = { mendukung: number, mempertimbangkan: number, tidaktahu: number, tidakmendukung: number }

/**
 * Karakter dukungan sebuah daerah: proporsi mendukung/mempertimbangkan/tidak tahu/
 * tidak mendukung. Tiap daerah menarik nilai sendiri sehingga grafik ANALISIS SENTIMEN
 * antar daerah terlihat berbeda (tidak seragam). Nilai tidak dipaksa berjumlah 100 karena
 * grafik menghitung ulang persentase dari total tersimpan.
 */
function randomCharacterPairing(): Profile {
   return {
      mendukung: getRandomIntInclusive(38, 60),
      mempertimbangkan: getRandomIntInclusive(18, 34),
      tidaktahu: getRandomIntInclusive(6, 18),
      tidakmendukung: getRandomIntInclusive(6, 20),
   }
}

/**
 * Profil harian: karakter daerah (stabil) + sedikit drift agar tiap tanggal sedikit berbeda.
 */
function driftProfile(ch: Profile): Profile {
   const j = () => getRandomIntInclusive(-3, 3)
   return {
      mendukung: clamp(ch.mendukung + j(), 20, 70),
      mempertimbangkan: clamp(ch.mempertimbangkan + j(), 10, 40),
      tidaktahu: clamp(ch.tidaktahu + j(), 4, 30),
      tidakmendukung: clamp(ch.tidakmendukung + j(), 4, 30),
   }
}

async function generateOne({ candidate1, candidate2, date, dataAudience, useKab, profileByGroup, rate }: { candidate1: string, candidate2: string, date: string, dataAudience: any[], useKab: boolean, profileByGroup: Record<string, Profile>, rate: number }) {
   const dateEmotion = new Date(moment(date).format('YYYY-MM-DD'))

   await prisma.candidatePairing.deleteMany({
      where: { idCandidate1: candidate1, idCandidate2: candidate2, dateEmotion }
   })

   const dataInsert = _.map(_.groupBy(dataAudience, "idKecamatan"), (v: any) => {
      const groupKey = String(useKab ? v[0].idKabkot : v[0].idKecamatan)
      const prof = profileByGroup[groupKey] ?? { mendukung: 40, mempertimbangkan: 25, tidaktahu: 15, tidakmendukung: 20 }
      const totalMax = _.sumBy(v, 'valueFilteredMax')

      const mendukungCount = _.floor(prof.mendukung * totalMax / 100)
      const mempertimbangkanCount = _.floor(prof.mempertimbangkan * totalMax / 100)
      const tidaktahuCount = _.floor(prof.tidaktahu * totalMax / 100)
      const tidakmendukungCount = _.floor(prof.tidakmendukung * totalMax / 100)

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
      const dataCandidate1 = await prisma.candidate.findUnique({ where: { id: pair.c1 } })

      // grafik regional dikelompokkan per kabupaten (tingkat 1) atau per kecamatan (tingkat 2)
      const useKab = dataCandidate1?.tingkat == 1
      const kondisi: any = useKab ? { idProvinsi: dataCandidate1?.idProvinsi } : { idKabkot: dataCandidate1?.idKabkot }

      const dataAudience = await prisma.audience.findMany({
         where: kondisi,
         orderBy: { idKecamatan: 'asc' }
      })

      // karakter dukungan per daerah, stabil untuk seluruh rentang tanggal
      const groups = _.uniq(dataAudience.map((v: any) => (useKab ? v.idKabkot : v.idKecamatan)))
      const characterByGroup: Record<string, Profile> = {}
      for (const g of groups) {
         characterByGroup[String(g)] = randomCharacterPairing()
      }

      for (const date of dates) {
         const profileByGroup: Record<string, Profile> = {}
         for (const g of Object.keys(characterByGroup)) {
            profileByGroup[g] = driftProfile(characterByGroup[g])
         }

         // probabilitas keberhasilan = rata-rata proporsi mendukung seluruh daerah
         const profs = Object.values(profileByGroup)
         const avgMendukung = _.meanBy(profs, (p) => p.mendukung)
         const avgSum = _.meanBy(profs, (p) => p.mendukung + p.mempertimbangkan + p.tidaktahu + p.tidakmendukung)
         const rate = avgSum > 0 ? _.round((avgMendukung / avgSum) * 100, 2) : 0

         await generateOne({ candidate1: pair.c1, candidate2: pair.c2, date, dataAudience, useKab, profileByGroup, rate })
      }
   }

   return {
      success: true,
      message: 'Sukses',
      processed: pairs.length * dates.length
   }
}
