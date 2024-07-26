'use server'
import prisma from "@/modules/_global/bin/prisma"

export default async function funDeleteNotifikasi({ id }: { id: any }) {
   try {
      if (id == "semua") {
         await prisma.notifications.deleteMany()
      } else {
         await prisma.notifications.deleteMany({
            where: {
               idUserClient: id
            }
         })
      }

      return { success: true, message: 'Sukses' }
   } catch (error) {
      console.log(error)
      return { success: false, message: 'Internal Server Error' }
   }
}