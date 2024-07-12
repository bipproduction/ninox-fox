import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

export async function GET() {
   const today = new Date()
   const yesterday = new Date(new Date().setDate(today.getDate() - 1))

   // data emosi kemarin
   const dataEmotionYesterday = await prisma.candidateEmotion.findMany({
      where: {
         dateEmotion: yesterday
      },
      select: {
         idCandidate: true,
         idProvinsi: true,
         idKabkot: true,
         idKecamatan: true,
         idKelurahan: true,
         confidence: true,
         supportive: true,
         positive: true,
         undecided: true,
         unsupportive: true,
         uncomfortable: true,
         negative: true,
         dissapproval: true,
      }
   })


   // cek data kemaren
   if (dataEmotionYesterday.length > 0) {

      // data candidate yg ada emosinya kemarin
      // const dataCandidateYesterday = _.map(_.groupBy(dataEmotionYesterday, "idCandidate"), (v: any) => ({
      //    idCandidate: v[0].idCandidate,
      // }))


      // data candidate yg ada emosinya hari ini
      const dataCandidateToday = await prisma.candidateEmotion.groupBy({
         where: {
            dateEmotion: today
         },
         by: 'idCandidate'
      })

      // data emosi yg sudah terfilter (by candidate id hari ini)
      const dataFilter = dataEmotionYesterday.filter(x => !dataCandidateToday.some(y => y.idCandidate === x.idCandidate));

      // cek data
      if (dataFilter.length > 0) {

         // omit data sesuai dg struktur database
         const dataTrue = dataFilter.map((v: any) => ({
            ..._.omit(v, ["idCandidate", "idProvinsi", "idKabkot", "idKecamatan", "idKelurahan", "confidence", "supportive", "positive", "undecided", "unsupportive", "uncomfortable", "negative", "dissapproval"]),
            dateEmotion: today,
            idCandidate: v.idCandidate,
            idProvinsi: v.idProvinsi,
            idKabkot: v.idKabkot,
            idKecamatan: v.idKecamatan,
            idKelurahan: v.idKelurahan,
            confidence: v.confidence,
            supportive: v.supportive,
            positive: v.positive,
            undecided: v.undecided,
            unsupportive: v.unsupportive,
            uncomfortable: v.uncomfortable,
            negative: v.negative,
            dissapproval: v.dissapproval,
         }));


         //   insert ke database
         const insert = await prisma.candidateEmotion.createMany({
            data: dataTrue
         })

         return Response.json({ success: true, message: 'Success' })
      } else {
         return Response.json({ success: false, message: 'Data Already Exist' })
      }

   } else {
      return Response.json({ success: false, message: 'Empty Data Yesterday' })
   }



}