'use server'
import prisma from "@/modules/_global/bin/prisma"
import { funGetOneCandidate } from "@/modules/candidate"
import _ from "lodash"
import moment from "moment"

export default async function funDownloadPairing({ request }: { request: any }) {
    let data, dataOmit = <any>[], title

    const kondisi = {
        idCandidate1: request.idCandidate1,
        idCandidate2: request.idCandidate2,
        dateEmotion: new Date(request.date)
    }


    if (request.idCandidate1 != 0 && request.idCandidate2 != 0) {
        const dCandidate1 = await funGetOneCandidate({ id: request.idCandidate1 })
        const dCandidate2 = await funGetOneCandidate({ id: request.idCandidate2 })

        const cek = await prisma.candidatePairing.count({
            where: kondisi
        })

        title = "Penilain Sentimen Pemilih dan Data Pasangan Regional " + dCandidate1?.name + " & " + dCandidate2?.name + " - " + moment(request.date).format('DD MMMM YYYY')

        if (cek > 0) {
            data = await prisma.candidatePairing.findMany({
                where: kondisi,
                select: {
                    id: true,
                    rate: true,
                    confidence: true,
                    supportive: true,
                    positive: true,
                    undecided: true,
                    unsupportive: true,
                    uncomfortable: true,
                    negative: true,
                    dissapproval: true,
                    idProvinsi: true,
                    idKabkot: true,
                    idKecamatan: true,
                    AreaProvinsi: {
                        select: {
                            name: true,
                        }
                    },
                    AreaKabkot: {
                        select: {
                            name: true,
                        }
                    },
                    AreaKecamatan: {
                        select: {
                            name: true,
                        }
                    }
                }
            })

            dataOmit = data.map((v: any) => ({
                ..._.omit(v, ["id", "rate", "confidence", "supportive", "positive", "undecided", "unsupportive", "uncomfortable", "negative", "dissapproval", "idProvinsi", "idKabkot", "idKecamatan", "AreaProvinsi", "AreaKabkot", "AreaKecamatan"]),
                id: v.id,
                idCandidate1: request.idCandidate1,
                idCandidate2: request.idCandidate2,
                idProvinsi: v.idProvinsi,
                idKabkot: v.idKabkot,
                idKecamatan: v.idKecamatan,
                candidate1: dCandidate1?.name,
                candidate2: dCandidate2?.name,
                provinsi: v.AreaProvinsi.name,
                kabkot: v.AreaKabkot.name,
                kecamatan: (v.AreaKecamatan && v.AreaKecamatan?.name),
                date: moment(request.date).format('YYYY-MM-DD'),
                rate: v.rate,
                PotensiMendukungFix: v.confidence,
                PotensiMendukungBerubah: v.supportive,
                MempertimbangkanFix: v.positive,
                MempertimbangkanBerubah: v.undecided,
                TidakTahuFix: v.unsupportive,
                TidakTahuBerubah: v.uncomfortable,
                PotensiTidakMendukungFix: v.negative,
                PotensiTidakMendukungBerubah: v.dissapproval,
            }))
        } else {
            if (request.tingkat == 1) {
                data = await prisma.areaKabkot.findMany({
                    where: {
                        idProvinsi: request.idProvinsi
                    },
                    select: {
                        id: true,
                        name: true,
                        AreaProvinsi: {
                            select: {
                                name: true,
                            }
                        }
                    }
                })

                dataOmit = data.map((v: any) => ({
                    ..._.omit(v, ["id", "name", "AreaProvinsi"]),
                    id: '',
                    idCandidate1: request.idCandidate1,
                    idCandidate2: request.idCandidate2,
                    idProvinsi: request.idProvinsi,
                    idKabkot: v.id,
                    idKecamatan: '',
                    candidate1: dCandidate1?.name,
                    candidate2: dCandidate2?.name,
                    provinsi: v.AreaProvinsi.name,
                    kabkot: v.name,
                    kecamatan: '',
                    date: moment(request.date).format('YYYY-MM-DD'),
                    rate: '0',
                    PotensiMendukungFix: '0',
                    PotensiMendukungBerubah: '0',
                    MempertimbangkanFix: '0',
                    MempertimbangkanBerubah: '0',
                    TidakTahuFix: '0',
                    TidakTahuBerubah: '0',
                    PotensiTidakMendukungFix: '0',
                    PotensiTidakMendukungBerubah: '0'
                }))

            } else {
                data = await prisma.areaKecamatan.findMany({
                    where: {
                        idKabkot: request.idKabkot
                    },
                    select: {
                        id: true,
                        name: true,
                        AreaKabkot: {
                            select: {
                                name: true,
                                AreaProvinsi: {
                                    select: {
                                        id: true,
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                })

                dataOmit = data.map((v: any) => ({
                    ..._.omit(v, ["id", "name", "AreaKabkot", "AreaProvinsi"]),
                    id: '',
                    idCandidate1: request.idCandidate1,
                    idCandidate2: request.idCandidate2,
                    idProvinsi: v.AreaKabkot.AreaProvinsi.id,
                    idKabkot: request.idKabkot,
                    idKecamatan: v.id,
                    candidate1: dCandidate1?.name,
                    candidate2: dCandidate2?.name,
                    provinsi: v.AreaKabkot.AreaProvinsi.name,
                    kabkot: v.AreaKabkot.name,
                    kecamatan: v.name,
                    date: moment(request.date).format('YYYY-MM-DD'),
                    rate: '0',
                    PotensiMendukungFix: '0',
                    PotensiMendukungBerubah: '0',
                    MempertimbangkanFix: '0',
                    MempertimbangkanBerubah: '0',
                    TidakTahuFix: '0',
                    TidakTahuBerubah: '0',
                    PotensiTidakMendukungFix: '0',
                    PotensiTidakMendukungBerubah: '0'
                }))


            }
        }
    }

    const allData = {
        data: dataOmit,
        title: title
    }

    return allData
}