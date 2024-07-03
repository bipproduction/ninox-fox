'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import { revalidatePath } from "next/cache";

export default async function funCopyEmotion({ dateFrom, dateTo, candidate }: { dateFrom: any, dateTo: any, candidate: any }) {
    const data = await prisma.candidateEmotion.findMany({
        where: {
            dateEmotion: dateFrom,
            idCandidate: candidate,

        },
        select: {
            idCandidate: true,
            idProvinsi: true,
            idKabkot: true,
            idKecamatan: true,
            idKelurahan: true,
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

    const dataTrue = data.map((v: any) => ({
        ..._.omit(v, ["idCandidate", "idProvinsi", "idKabkot", "idKecamatan", "idKelurahan", "confidence", "supportive", "positive", "undecided", "unsupportive", "uncomfortable", "negative", "dissapproval"]),
        dateEmotion: dateTo,
        idCandidate: v.idCandidate,
        idProvinsi: v.idProvinsi,
        idKabkot: v.idKabkot,
        idKecamatan: v.idKecamatan,
        idKelurahan: v.idKelurahan,
        confidence: v.confidence,
        supportive: v.supportive,
        positive: v.positive,
        undecided: v.undecided,
        unsupportive: v.unsupportive,
        uncomfortable: v.uncomfortable,
        negative: v.negative,
        dissapproval: v.dissapproval,
    }));

    const insert = await prisma.candidateEmotion.createMany({
        data: dataTrue
    })

    revalidatePath(`dashboard/emotion`)

    return {
        success: true,
        message: 'Success'
    }
}