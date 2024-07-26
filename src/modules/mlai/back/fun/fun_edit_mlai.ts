"use server"
import prisma from "@/modules/_global/bin/prisma"
import { revalidatePath } from "next/cache"

export default async function funEditMlAi({ body, text }: { body: any, text: any }) {
    try {
        let y = new Date('1970-01-01 ' + body.timeContent)
        let isoDateTime = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString()
        const tanggal = new Date(String(body.dateContent))

        const data = await prisma.mlAi.update({
            where: {
                id: body.id,
            },
            data: {
                content: text,
                dateContent: tanggal,
                timeContent: isoDateTime,
            },
            select: {
                Candidate: {
                    select: {
                        name: true,
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

        revalidatePath("dashboard/ml-ai?prov" + data.Candidate.AreaProvinsi + "&city" + data.Candidate.AreaKabkot)
        return { success: true, message: "Edit Success", }

    } catch (error) {
        console.log(error)
        return { success: false, message: "Internal Server Error" }
    }
}