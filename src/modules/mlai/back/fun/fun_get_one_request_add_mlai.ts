'use server'
import prisma from "@/modules/_global/bin/prisma"

export default async function funGetOneRequestAddMlAi({ id }: { id: any }) {
   let hasil = <any>{
      id: null,
      request: '',
      status: '',
      idCandidate: null,
      idProvinsi: null,
      idKabkot: null
   }

   if (id != undefined && id != null && id != '') {

      const data = await prisma.mlAiRequest.findUnique({
         where: {
            id: id,
            status: 0
         },
         select: {
            id: true,
            request: true,
            status: true,
            idCandidate: true,
            Candidate: {
               select: {
                  name: true,
                  idProvinsi: true,
                  idKabkot: true,
                  AreaKabkot: {
                     select: {
                        name: true
                     }
                  },
                  AreaProvinsi: {
                     select: {
                        name: true
                     }
                  }
               }
            }
         }
      })

      hasil = {
         id: data?.id,
         request: data?.request,
         status: data?.status,
         idCandidate: data?.idCandidate,
         nameCandidate: data?.Candidate?.name,
         idProvinsi: data?.Candidate?.idProvinsi,
         areaProvinsi: data?.Candidate?.AreaProvinsi?.name,
         idKabkot: data?.Candidate?.idKabkot,
         areaKabkot: data?.Candidate?.AreaKabkot?.name
      }

   }


   return hasil

}