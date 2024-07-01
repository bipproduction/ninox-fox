'use server'
import prisma from "@/modules/_global/bin/prisma"
import { funGetOneCandidateFront } from "@/modules/candidate"
import { funGetUserDefaultFront } from "@/modules/user"
import _ from 'lodash'

export default async function funGetPopularityTodayNew({ candidate1, candidate2 }: { candidate1?: any, candidate2?: any }) {
   let dataCandidate, data = <any>[]
   const def = await funGetUserDefaultFront()

   if (!_.isNull(candidate1) && !_.isNull(candidate2) && !_.isUndefined(candidate1) && !_.isUndefined(candidate2)) {
      const dataC1 = await funGetOneCandidateFront({ candidate: candidate1 })
      const dataC2 = await funGetOneCandidateFront({ candidate: candidate2 })

      dataCandidate = {
         idCandidate1: dataC1?.id,
         nameCandidate1: dataC1?.name,
         imgCandidate1: dataC1?.img,
         idCandidate2: dataC2?.id,
         nameCandidate2: dataC2?.name,
         imgCandidate2: dataC2?.img
      }
   } else {
      const dataCandidatePairing = await prisma.candidatePairing.findFirst({
         where: {
            Candidate1: {
               isActive: true,
               idProvinsi: Number(def.idProvinsi),
               idKabkot: def.idKabkot,
               tingkat: def.tingkat
            },
            Candidate2: {
               isActive: true,
               idProvinsi: Number(def.idProvinsi),
               idKabkot: def.idKabkot,
               tingkat: def.tingkat
            },
            dateEmotion: new Date()
         },
         select: {
            rate: true,
            Candidate1: {
               select: {
                  name: true,
                  id: true,
                  img: true,
               }
            },
            Candidate2: {
               select: {
                  name: true,
                  id: true,
                  img: true,
               }
            }
         },
         orderBy: {
            rate: 'desc'
         }
      })

      dataCandidate = {
         idCandidate1: dataCandidatePairing?.Candidate1.id,
         nameCandidate1: dataCandidatePairing?.Candidate1.name,
         imgCandidate1: dataCandidatePairing?.Candidate1.img,
         idCandidate2: dataCandidatePairing?.Candidate2.id,
         nameCandidate2: dataCandidatePairing?.Candidate2.name,
         imgCandidate2: dataCandidatePairing?.Candidate2.img
      }
   }


   if (!_.isUndefined(dataCandidate.idCandidate1) && !_.isUndefined(dataCandidate.idCandidate2)) {
      data = await prisma.candidatePairing.findMany({
         where: {
            idCandidate1: dataCandidate.idCandidate1,
            idCandidate2: dataCandidate.idCandidate2,
            dateEmotion: new Date()
         }
      })
   }

   const format = _.map(_.groupBy(data, "idProvinsi"), (v: any) => ({
      rate: v[0].rate,
      mendukung: _.sumBy(v, 'confidence') + _.sumBy(v, 'supportive'),
      mempertimbangkan: _.sumBy(v, 'positive') + _.sumBy(v, 'undecided'),
      tidaktahu: _.sumBy(v, 'unsupportive') + _.sumBy(v, 'uncomfortable'),
      tidakmendukung: _.sumBy(v, 'negative') + _.sumBy(v, 'dissapproval'),
      total: _.sum([
         _.sumBy(v, 'confidence'),
         _.sumBy(v, 'dissapproval'),
         _.sumBy(v, 'negative'),
         _.sumBy(v, 'positive'),
         _.sumBy(v, 'supportive'),
         _.sumBy(v, 'uncomfortable'),
         _.sumBy(v, 'undecided'),
         _.sumBy(v, 'unsupportive'),
      ])
   }))

   const persen = {
      mendukung: Number(((format[0]?.mendukung / format[0]?.total) * 100).toFixed(2)),
      mempertimbangkan: Number(((format[0]?.mempertimbangkan / format[0]?.total) * 100).toFixed(2)),
      tidaktahu: Number(((format[0]?.tidaktahu / format[0]?.total) * 100).toFixed(2)),
      tidakmendukung: Number(((format[0]?.tidakmendukung / format[0]?.total) * 100).toFixed(2)),
   }

   const allData = {
      pairingCandidate: dataCandidate,
      rate: format[0]?.rate,
      chart: persen
   }

   return allData

}