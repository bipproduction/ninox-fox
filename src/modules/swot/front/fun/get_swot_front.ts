'use server'
import prisma from "@/modules/_global/bin/prisma"
import { funGetUserDefaultFront } from "@/modules/user"
import _ from "lodash"
import moment from "moment"

export default async function funGetSwotFront({ candidate }: { candidate?: any }) {
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

    let candidateReal = null

    if (candidate == null) {
        candidateReal = can?.id
    } else {
        candidateReal = candidate
    }

    if (candidateReal == null) {
        return null
    } else {
        const data = await prisma.swot.findMany({
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


        

        const allData = {
            strength: dataDate.filter((v: any) => v.category === "STRENGTH" && v.tglCreate == rand),
            weakness: dataDate.filter((v: any) => v.category === "WEAKNESS" && v.tglCreate == rand),
            opportunity: dataDate.filter((v: any) => v.category === "OPPORTUNITY" && v.tglCreate == rand),
            threat: dataDate.filter((v: any) => v.category === "THREAT" && v.tglCreate == rand)
        }

        
        return allData

    }
}