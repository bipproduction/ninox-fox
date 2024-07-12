'use server'
import prisma from "@/modules/_global/bin/prisma"
import _, { now } from "lodash"
import moment from "moment"

export default async function funSettingDataEmotion({ candidate, date, positif, netral, negatif }: { candidate: any, date: any, positif: any, netral: any, negatif: any }) {

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
         dateEmotion: new Date(moment(date).format('YYYY-MM-DD')),
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

         // PotensiMendukungFix: 0,
         // PotensiMendukungBerubah: valuenya[0].valueSetPositif1[index],
         // MempertimbangkanFix: 0,
         // MempertimbangkanBerubah: valuenya[0].valueSetPositif2[index],
         // TidakTahuFix: 0,
         // TidakTahuBerubah: valuenya[0].valueSetNetral[index],
         // PotensiTidakMendukungFix: 0,
         // PotensiTidakMendukungBerubah: valuenya[0].valueSetNegatif[index]
      })

   }
   )

   const insert = await prisma.candidateEmotion.createMany({
      data: dataOmit
   })


   return {
      success: true,
      message: 'Sukses'
   }

}