'use server'
import { funGetUserByCookies } from "@/modules/auth"
import prisma from "../../bin/prisma"
import { funGetOneCandidate } from "@/modules/candidate"
import { funGetOneProvinsi } from "../.."
import _ from "lodash"
import mtqq_client from "../../util/mqtt_client"

export default async function funAddNotifications({ kategori, candidateId, candidateId2, provinsiId }: { kategori: any, candidateId?: any, candidateId2?: any, provinsiId?: any }) {
   const kandidat = await funGetOneCandidate({ id: candidateId })
   const admin = await funGetUserByCookies()
   let desc = ''
   let judul = ''
   let paramCan = true
   let kondisi = {
      idCandidate: kandidat.id,
      isFront: true
   }

   if (provinsiId == null) {
      provinsiId = kandidat.idProvinsi
   }

   if (kategori == 'emotion') {
      desc = 'Data emosi kandidat ' + kandidat.name + ' telah diperbarui'
      judul = 'Update data emosi'
   } else if (kategori == 'step') {
      desc = 'Data STEP kandidat ' + kandidat.name + ' telah diperbarui'
      judul = 'Update data STEP'
   } else if (kategori == 'swot') {
      desc = 'Data SWOT kandidat ' + kandidat.name + ' telah diperbarui'
      judul = 'Update data SWOT'
   } else if (kategori == 'mlai') {
      desc = 'Data ML-AI kandidat ' + kandidat.name + ' telah diperbarui'
      judul = 'Update data ML-AI'
   } else if (kategori == 'mlai-request') {
      desc = 'Respon data learner telah diupdate'
      judul = 'Respon data learner'
   } else if (kategori == 'pairing') {
      const kandidat2 = await funGetOneCandidate({ id: candidateId2 })
      desc = 'Data pasangan regional ' + kandidat.name + ' & ' + kandidat2.name + ' telah diperbarui'
      judul = 'Update data pasangan regional'
   } else {
      paramCan = false
      kondisi = <any>{
         idProvinsi: Number(provinsiId),
         isFront: true
      }

      if (kategori == 'pct') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data trend perhatian publik provinsi ' + prov?.name + ' telah diperbarui'
         judul = 'Update data trend perhatian publik'
      } else if (kategori == 'lta') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data penilaian sifat pemimpin provinsi ' + prov?.name + ' telah diperbarui'
         judul = 'Update data penilaian sifat pemimpin'
      } else if (kategori == 'rhi') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data isu provinsi ' + prov?.name + ' telah diperbarui'
         judul = 'Update data isu wilayah'
      } else if (kategori == 'ketenagakerjaan') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data ketenagakerjaan wilayah ' + prov?.name + ' telah diperbarui'
         judul = 'Update data ketenagakerjaan'
      } else if (kategori == 'infrastruktur-transportasi') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data infrastruktur wilayah ' + prov?.name + ' telah diperbarui'
         judul = 'Update data infrastruktur & transportasi'
      } else if (kategori == 'keagamaan') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data keagamaan wilayah ' + prov?.name + ' telah diperbarui'
         judul = 'Update data keagamaan & transportasi'
      } else if (kategori == 'pendidikan') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data pendidikan wilayah ' + prov?.name + ' telah diperbarui'
         judul = 'Update data pendidikan & transportasi'
      } else if (kategori == 'kesehatan') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data kesehatan wilayah ' + prov?.name + ' telah diperbarui'
         judul = 'Update data kesehatan'
      } else if (kategori == 'ekonomi') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data ekonomi wilayah ' + prov?.name + ' telah diperbarui'
         judul = 'Update data ekonomi'
      } else if (kategori == 'pertanian') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data pertanian wilayah ' + prov?.name + ' telah diperbarui'
         judul = 'Update data pertanian'
      } else if (kategori == 'kemiskinan-ketimpangan') {
         const prov = await funGetOneProvinsi({ id: provinsiId })
         desc = 'Data kemiskinan-ketimpangan wilayah ' + prov?.name + ' telah diperbarui'
         judul = 'Update data kemiskinan-ketimpangan'
      }
   }


   const userArea = await prisma.userArea.findMany({
      where: kondisi,
      select: {
         idUser: true
      }
   })

   const listUser = userArea.map((v: any) => ({
      ..._.omit(v, ["idUser"]),
      idUserClient: v.idUser,
      idUserAdmin: (admin) ? admin.id : '',
      category: kategori,
      description: desc,
      title: judul,
      idCandidate: (paramCan) ? kandidat.id : null,
      idProvinsi: Number(provinsiId)
   }));

   await prisma.notifications.createMany({
      data: listUser
   })


   for (let index = 0; index < listUser.length; index++) {
      const user = listUser[index].idUserClient
      const title = listUser[index].title
      const desc = listUser[index].description
      mtqq_client.publish("app_ninox_fox", JSON.stringify({
         "user": user,
         "title": title,
         "description": desc
      }))
   }

   return { success: true }
}