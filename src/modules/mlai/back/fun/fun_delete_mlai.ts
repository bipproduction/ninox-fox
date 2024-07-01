"use server"

import prisma from "@/modules/_global/bin/prisma"

export default async function funDeleteMlAi({ id }: { id: any }) {
    const upd = await prisma.mlAi.update({
        where:{
            id: id
        },
        data:{
            isActive: false
        }
    })

    return{
        success: true,
        message: "Delete Success",
    }
}