import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment"

export const dynamic = "force-dynamic"

export async function GET() {
   const today = moment().format('YYYY-MM-DD')
   const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
   const tlp = [628980185458, 6289697338821]

   async function sendWA(kategori: string) {
      let kalimat = ''

      if (kategori == 'sukses') {
         kalimat = '*NINOX* : copy data pasangan *sukses*'
      } else if (kategori == 'already-exist') {
         kalimat = '*NINOX* : copy data pasangan *gagal* karena data hari ini telah tersedia'
      } else if (kategori == 'data-unavailable') {
         kalimat = '*NINOX* : copy data pasangan *gagal* karena tidak ada data dihari sebelumnya'
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

   // data kemarin 
   const dataYesterday = await prisma.candidatePairing.findMany({
      where: {
         dateEmotion: new Date(yesterday)
      },
      select: {
         idCandidate1: true,
         idCandidate2: true,
         idProvinsi: true,
         idKabkot: true,
         idKecamatan: true,
         rate: true,
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
   if (dataYesterday.length > 0) {

      // data candidate yg ada emosinya hari ini
      const dataPairingToday = await prisma.candidatePairing.groupBy({
         where: {
            dateEmotion: new Date(today)
         },
         by: ['idCandidate1', 'idCandidate2'],
      })

      // data emosi yg sudah terfilter (by candidate id hari ini)
      const dataFilter = dataYesterday.filter(x => !dataPairingToday.some(y => y.idCandidate1 === x.idCandidate1 && y.idCandidate2 === x.idCandidate2));

      console.log(dataFilter)

      // cek data
      if (dataFilter.length > 0) {

         // omit data sesuai dg struktur database
         const dataTrue = dataFilter.map((v: any) => ({
            ..._.omit(v, ["idCandidate1", "idCandidate2", "idProvinsi", "idKabkot", "idKecamatan", "rate", "confidence", "supportive", "positive", "undecided", "unsupportive", "uncomfortable", "negative", "dissapproval"]),
            dateEmotion: new Date(today),
            idCandidate1: v.idCandidate1,
            idCandidate2: v.idCandidate2,
            idProvinsi: v.idProvinsi,
            idKabkot: v.idKabkot,
            idKecamatan: v.idKecamatan,
            rate: v.rate,
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
         const insert = await prisma.candidatePairing.createMany({
            data: dataTrue
         })

         sendWA('sukses')
         // console.log(dataTrue)
         console.log('sukses!!! dari tgl ' + yesterday + ' ke ' + today + '--' + new Date(today))
         return Response.json({ success: true, message: 'Success' })
      } else {
         sendWA('already-exist')
         console.log('gagal!!! karena sudah ada data (dari tgl ' + yesterday + ' ke ' + today + '--' + new Date(today) + ')')
         return Response.json({ success: false, message: 'Data Already Exist' })
      }

   } else {
      sendWA('data-unavailable')
      console.log('gagal!!! karena data pasangan kemaren kosong (dari tgl ' + yesterday + ' ke ' + today + '--' + new Date(today) + ')')
      return Response.json({ success: false, message: 'Empty Data Yesterday' })
   }


}