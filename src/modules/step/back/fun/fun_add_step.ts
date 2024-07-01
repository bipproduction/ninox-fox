"use server"
import prisma from "@/modules/_global/bin/prisma"
import { funLogUser } from "@/modules/user"
import { revalidatePath } from "next/cache"

/**
 * Fungsi untuk create step
 * @param {Step} body - berisi idcandidate, category, content, sentiment
 * @returns success - true 
 */
export default async function funAddStep({ body, positive, negative }: { body: any, positive: any, negative: any }) {
    let data

    // POSITIVE
    if (positive != '' && positive != '<p></p>') {
        data = await prisma.step.create({
            data: {
                idCandidate: body.idCandidate,
                category: body.category,
                content: positive,
                sentiment: 1
            },
            select: {
                id: true
            }
        })

        await funLogUser({ act: 'ADD', desc: `User menambah data STEP`, idContent: data.id, tbContent: 'step' })
    }

    // NEGATIVE
    if (negative != '' && negative != '<p></p>') {
        data = await prisma.step.create({
            data: {
                idCandidate: body.idCandidate,
                category: body.category,
                content: negative,
                sentiment: 2
            },
            select: {
                id: true
            }
        })

        await funLogUser({ act: 'ADD', desc: `User menambah data STEP`, idContent: data.id, tbContent: 'step' })
    }

    const area = await prisma.candidate.findUnique({
        where: {
            id: body.idCandidate
        }
    })

    revalidatePath("dashboard/step?prov" + area?.idProvinsi + "&city" + area?.idKabkot)

    return {
        success: true,
        // data: data.id,
        message: "Success"
    }
}