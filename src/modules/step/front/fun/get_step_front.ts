'use server'
import prisma from "@/modules/_global/bin/prisma"
import { funGetUserDefaultFront } from "@/modules/user"
import _ from "lodash"
import moment from "moment"

export default async function funGetStepFront({ candidate }: { candidate?: any }) {
    const def = await funGetUserDefaultFront()
    const can = await prisma.candidate.findFirst({
        where: {
            isActive: true,
            idProvinsi: Number(def.idProvinsi),
            idKabkot: def.idKabkot,
            tingkat: def.tingkat
        },
        select: {
            id: true,
        },
        orderBy: {
            name: 'asc'
        }
    })

    let candidateReal = null, allData = {}

    if (candidate == null) {
        candidateReal = can?.id
    } else {
        candidateReal = candidate
    }

    if (candidateReal != null) {
        const data = await prisma.step.findMany({
            where: {
                idCandidate: candidateReal,
                isActive: true,
            },
        })
        const dataDate = data.map((v: any) => ({
            ..._.omit(v, ["createdAt"]),
            tglCreate: moment(v.createdAt).format('YYYY-MM-DD'),
        }))

        const dataGroup = _.groupBy(
            dataDate, (v) => v.tglCreate
        )

        const keys = Object.keys(dataGroup)
        const rand = keys[_.random(0, keys.length - 1)]

        allData = {
            sosial: dataDate.filter((v: any) => v.category === "SOSIAL" && v.tglCreate == rand),
            teknologi: dataDate.filter((v: any) => v.category === "TEKNOLOGI" && v.tglCreate == rand),
            ekonomi: dataDate.filter((v: any) => v.category === "EKONOMI" && v.tglCreate == rand),
            politik: dataDate.filter((v: any) => v.category === "POLITIK" && v.tglCreate == rand)
        }
    }

    return allData
}