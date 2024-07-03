'use server'
import prisma from "@/modules/_global/bin/prisma"

export default async function funGetOneCandidate({ id }: { id: any }) {
    const data = await prisma.candidate.findUnique({
        where: {
            id: String(id)
        },
        select: {
            id: true,
            idKabkot: true,
            idProvinsi: true,
            name: true,
            img: true,
            tingkat: true,
            AreaProvinsi: {
                select: {
                    name: true
                },
            },
            AreaKabkot: {
                select: {
                    name: true
                }
            }
        }
    })

    const allData = {
        name: data?.name,
        id: data?.id,
        idKabkot: data?.idKabkot,
        idProvinsi: data?.idProvinsi,
        AreaProvinsi: data?.AreaProvinsi?.name,
        AreaKabkot: data?.AreaKabkot?.name,
        img: data?.img,
        tingkat : data?.tingkat
    }
    return allData
}