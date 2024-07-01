'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from 'lodash'

export default async function funGetPairingByCanAndDate({ request }: { request: any }) {
    let data, dataOmit = <any>[], th = null

    const kondisi = {
        idCandidate1: request.idCandidate1,
        idCandidate2: request.idCandidate2,
        dateEmotion: new Date(request.date)
    }


    if (request.idCandidate1 != 0 && request.idCandidate2 != 0) {
        if (request.tingkat == 1) {
            data = await prisma.candidatePairing.findMany({
                where: kondisi,
                select: {
                    rate: true,
                    confidence: true,
                    supportive: true,
                    positive: true,
                    undecided: true,
                    unsupportive: true,
                    uncomfortable: true,
                    negative: true,
                    dissapproval: true,
                    AreaKabkot: {
                        select: {
                            name: true
                        }
                    },
                    Candidate1: {
                        select: {
                            name: true
                        }
                    },
                    Candidate2: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            dataOmit = data.map((v: any) => ({
                ..._.omit(v, ["AreaKabkot", "Candidate1", "Candidate2", "rate"]),
                area: v.AreaKabkot.name,
                can1: v.Candidate1.name,
                can2: v.Candidate2.name,
                rate: v.rate.toString(),
            }))

            th = "KABUPATEN/KOTA"

        } else {
            data = await prisma.candidatePairing.findMany({
                where: kondisi,
                select: {
                    rate: true,
                    confidence: true,
                    supportive: true,
                    positive: true,
                    undecided: true,
                    unsupportive: true,
                    uncomfortable: true,
                    negative: true,
                    dissapproval: true,
                    AreaKecamatan: {
                        select: {
                            name: true
                        }
                    },
                    Candidate1: {
                        select: {
                            name: true
                        }
                    },
                    Candidate2: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            dataOmit = data.map((v: any) => ({
                ..._.omit(v, ["AreaKecamatan", "Candidate1", "Candidate2", "rate"]),
                area: v.AreaKecamatan.name,
                can1: v.Candidate1.name,
                can2: v.Candidate2.name,
                rate: v.rate.toString(),
            }))

            th = "KECAMATAN"
        }
    }

    const allData = {
        data: dataOmit,
        th: th
    }

    return allData

}