'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

export default async function funPreviewUploadEmotion({ csv, tingkat, prov, kab }: { csv: any, tingkat: any, prov: any, kab: any }) {
   let result = <any>[], audience = <any>[], th = ''

   if (tingkat == 1) {
      result = _.map(_.groupBy(csv, "idKabkot"), (v: any) => ({
         name: _.toString(v[0].kabkot),
         idArea: v[0].idKabkot,
         PotensiMendukungFix: _.sumBy(v, function (o: any) { return Number(o.PotensiMendukungFix); }),
         PotensiMendukungBerubah: _.sumBy(v, function (o: any) { return Number(o.PotensiMendukungBerubah); }),
         MempertimbangkanFix: _.sumBy(v, function (o: any) { return Number(o.MempertimbangkanFix); }),
         MempertimbangkanBerubah: _.sumBy(v, function (o: any) { return Number(o.MempertimbangkanBerubah); }),
         TidakTahuFix: _.sumBy(v, function (o: any) { return Number(o.TidakTahuFix); }),
         TidakTahuBerubah: _.sumBy(v, function (o: any) { return Number(o.TidakTahuBerubah); }),
         PotensiTidakMendukungFix: _.sumBy(v, function (o: any) { return Number(o.PotensiTidakMendukungFix); }),
         PotensiTidakMendukungBerubah: _.sumBy(v, function (o: any) { return Number(o.PotensiTidakMendukungBerubah); }),
         filtered: _.sum([
            _.sumBy(v, function (o: any) { return Number(o.PotensiMendukungFix); }),
            _.sumBy(v, function (o: any) { return Number(o.PotensiMendukungBerubah); }),
            _.sumBy(v, function (o: any) { return Number(o.MempertimbangkanFix); }),
            _.sumBy(v, function (o: any) { return Number(o.MempertimbangkanBerubah); }),
            _.sumBy(v, function (o: any) { return Number(o.TidakTahuFix); }),
            _.sumBy(v, function (o: any) { return Number(o.TidakTahuBerubah); }),
            _.sumBy(v, function (o: any) { return Number(o.PotensiTidakMendukungFix); }),
            _.sumBy(v, function (o: any) { return Number(o.PotensiTidakMendukungBerubah); }),
         ])
      }))

      const dataAudience = await prisma.audience.findMany({
         where: {
            idProvinsi: prov
         }
      })

      audience = _.map(_.groupBy(dataAudience, "idKabkot"), (v: any) => ({
         idArea: v[0].idKabkot,
         value: _.sumBy(v, 'value'),
         valueFilteredMax: _.sumBy(v, 'valueFilteredMax')
      }))

      th = "Kabupaten/Kota"


   } else if (tingkat == 2) {
      result = _.map(_.groupBy(csv, "idKecamatan"), (v: any) => ({
         name: _.toString(v[0].kecamatan),
         idArea: v[0].idKecamatan,
         PotensiMendukungFix: _.sumBy(v, function (o: any) { return Number(o.PotensiMendukungFix); }),
         PotensiMendukungBerubah: _.sumBy(v, function (o: any) { return Number(o.PotensiMendukungBerubah); }),
         MempertimbangkanFix: _.sumBy(v, function (o: any) { return Number(o.MempertimbangkanFix); }),
         MempertimbangkanBerubah: _.sumBy(v, function (o: any) { return Number(o.MempertimbangkanBerubah); }),
         TidakTahuFix: _.sumBy(v, function (o: any) { return Number(o.TidakTahuFix); }),
         TidakTahuBerubah: _.sumBy(v, function (o: any) { return Number(o.TidakTahuBerubah); }),
         PotensiTidakMendukungFix: _.sumBy(v, function (o: any) { return Number(o.PotensiTidakMendukungFix); }),
         PotensiTidakMendukungBerubah: _.sumBy(v, function (o: any) { return Number(o.PotensiTidakMendukungBerubah); }),
         filtered: _.sum([
            _.sumBy(v, function (o: any) { return Number(o.PotensiMendukungFix); }),
            _.sumBy(v, function (o: any) { return Number(o.PotensiMendukungBerubah); }),
            _.sumBy(v, function (o: any) { return Number(o.MempertimbangkanFix); }),
            _.sumBy(v, function (o: any) { return Number(o.MempertimbangkanBerubah); }),
            _.sumBy(v, function (o: any) { return Number(o.TidakTahuFix); }),
            _.sumBy(v, function (o: any) { return Number(o.TidakTahuBerubah); }),
            _.sumBy(v, function (o: any) { return Number(o.PotensiTidakMendukungFix); }),
            _.sumBy(v, function (o: any) { return Number(o.PotensiTidakMendukungBerubah); }),
         ])
      }))

      const dataAudience = await prisma.audience.findMany({
         where: {
            idKabkot: kab
         }
      })

      audience = _.map(_.groupBy(dataAudience, "idKecamatan"), (v: any) => ({
         idArea: v[0].idKecamatan,
         value: _.sumBy(v, 'value'),
         valueFilteredMax: _.sumBy(v, 'valueFilteredMax')
      }))

      th = "Kecamatan"
   }

   const allData = {
      data: result,
      audience: audience,
      lainnya: {
         th: th,
         candidate: csv[0].candidate,
         date: csv[0].date,
      }
   }

   return allData
}