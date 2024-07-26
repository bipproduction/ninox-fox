"use server"
import prisma from "@/modules/_global/bin/prisma"

export default async function funDeleteMlAi({ id }: { id: any }) {
    try {
        const upd = await prisma.mlAi.update({
            where: {
                id: id
            },
            data: {
                isActive: false
            }
        })

        return {
            success: true,
            message: "Delete Success",
        }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Internal Server Error" }
    }
}