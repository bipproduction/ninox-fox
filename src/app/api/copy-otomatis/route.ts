import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

export const dynamic = "force-dynamic"
export async function GET() {
   const today = new Date()
   const yesterday = new Date(new Date().setDate(today.getDate() - 1))
   const tlp = [628980185458, 6289697338821]

   async function sendWA(kategori: string) {
      let kalimat = ''

      if (kategori == 'sukses') {
         kalimat = '*NINOX* : copy data *sukses*'
      } else if (kategori == 'already-exist') {
         kalimat = '*NINOX* : copy data *gagal* karena data hari ini telah tersedia'
      } else if (kategori == 'data-unavailable') {
         kalimat = '*NINOX* : copy data *gagal* karena tidak ada data dihari sebelumnya'
      }

      for (let index = 0; index < tlp.length; index++) {
         await fetch(`https://wa.wibudev.com/code?nom=${tlp[index]}&text=${kalimat}`, {
            cache: "no-cache"
         })
         // .then(
         //    async (res) => {
         //       if (res.status == 200) {
         // console.log('berhasil' + tlp[index])
         //       } else {
         // console.log('gagal' + tlp[index])
         //       }
         //    }
         // )
      }
   }

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

         sendWA('sukses')
         return Response.json({ success: true, message: 'Success' })
      } else {
         sendWA('already-exist')
         return Response.json({ success: false, message: 'Data Already Exist' })
      }

   } else {
      sendWA('data-unavailable')
      return Response.json({ success: false, message: 'Empty Data Yesterday' })

   }



}