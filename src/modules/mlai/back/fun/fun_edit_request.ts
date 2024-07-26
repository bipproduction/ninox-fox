"use server"
import prisma from "@/modules/_global/bin/prisma"
import { revalidatePath } from "next/cache"

export default async function funEditRequest({ body }: { body: any }) {
   try {
      const dateFix = body.date + ' ' + body.time

      console.log(dateFix)

      const data = await prisma.mlAiRequest.update({
         where: {
            id: body.id
         },
         data: {
            request: body.request,
            createdAt: new Date(dateFix)
         },
         select: {
            id: true
         }
      })

      revalidatePath("dashboard/ml-ai/request")

      return { success: true, message: "Sukses" }
   } catch (error) {
      console.error(error);
      return { success: false, message: "Internal Server Error" }
   }


}