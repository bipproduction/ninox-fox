'use server'
import prisma from "@/modules/_global/bin/prisma"
import { funGetOneCandidate } from "@/modules/candidate"
import _ from "lodash"
import moment from "moment"

export default async function funDownloadEmotion({ request }: { request: any }) {
    let data, dataOmit = <any>[], title

    const kondisi = {
        idCandidate: String(request.idCandidate),
        dateEmotion: new Date(request.date)
    }

    if (request.idCandidate != 0) {
        const dCandidate = await funGetOneCandidate({ id: request.idCandidate })

        const cek = await prisma.candidateEmotion.count({
            where: kondisi
        })

        title = "Sentimen " + dCandidate?.name + " - " + moment(request.date).format('DD MMMM YYYY')

        if (cek > 0) {
            data = await prisma.candidateEmotion.findMany({
                where: kondisi,
                select: {
                    id: true,
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
                    idKelurahan: true,
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
                    },
                    AreaKelurahan: {
                        select: {
                            name: true,
                        }
                    }
                }
            })

            dataOmit = data.map((v: any) => ({
                ..._.omit(v, ["id", "confidence", "supportive", "positive", "undecided", "unsupportive", "uncomfortable", "negative", "dissapproval", "idProvinsi", "idKabkot", "idKecamatan", "idKelurahan", "AreaProvinsi", "AreaKabkot", "AreaKecamatan", "AreaKelurahan"]),
                id: v.id,
                idCandidate: request.idCandidate,
                idProvinsi: v.idProvinsi,
                idKabkot: v.idKabkot,
                idKecamatan: v.idKecamatan,
                idKelurahan: v.idKelurahan,
                candidate: dCandidate?.name,
                provinsi: v.AreaProvinsi.name,
                kabkot: v.AreaKabkot.name,
                kecamatan: v.AreaKecamatan.name,
                kelurahan: v.AreaKelurahan.name,
                date: moment(request.date).format('YYYY-MM-DD'),
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
                data = await prisma.areaKelurahan.findMany({
                    select: {
                        id: true,
                        name: true,
                        AreaKecamatan: {
                            select: {
                                name: true,
                                id: true,
                                AreaKabkot: {
                                    select: {
                                        id: true,
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
                        }
                    }
                })

                const omitFirst = data?.map((v: any) => ({
                    ..._.omit(v, ["id", "name", "AreaKecamatan"]),
                    idKelurahan: v.id,
                    kelurahan: v.name,
                    idKecamatan: v.AreaKecamatan.id,
                    kecamatan: v.AreaKecamatan.name,
                    idKabkot: v.AreaKecamatan.AreaKabkot.id,
                    kabkot: v.AreaKecamatan.AreaKabkot.name,
                    idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
                    provinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.name,
                }))

                const filter = omitFirst.filter((i: any) => i.idProvinsi === request.idProvinsi)

                dataOmit = filter.map((v: any) => ({
                    ..._.omit(v, ["idKelurahan", "kelurahan", "idKecamatan", "kecamatan", "idKabkot", "kabkot", "idProvinsi", "provinsi"]),
                    id: '',
                    idCandidate: request.idCandidate,
                    idProvinsi: v.idProvinsi,
                    idKabkot: v.idKabkot,
                    idKecamatan: v.idKecamatan,
                    idKelurahan: v.idKelurahan,
                    candidate: dCandidate?.name,
                    provinsi: v.provinsi,
                    kabkot: v.kabkot,
                    kecamatan: v.kecamatan,
                    kelurahan: v.kelurahan,
                    date: moment(request.date).format('YYYY-MM-DD'),
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
                data = await prisma.areaKelurahan.findMany({
                    select: {
                        id: true,
                        name: true,
                        AreaKecamatan: {
                            select: {
                                name: true,
                                id: true,
                                AreaKabkot: {
                                    select: {
                                        id: true,
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
                        }
                    }
                })

                const omitFirst = data?.map((v: any) => ({
                    ..._.omit(v, ["id", "name", "AreaKecamatan"]),
                    idKelurahan: v.id,
                    kelurahan: v.name,
                    idKecamatan: v.AreaKecamatan.id,
                    kecamatan: v.AreaKecamatan.name,
                    idKabkot: v.AreaKecamatan.AreaKabkot.id,
                    kabkot: v.AreaKecamatan.AreaKabkot.name,
                    idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
                    provinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.name,
                }))

                const filter = omitFirst.filter((i: any) => i.idKabkot === request.idKabkot)

                dataOmit = filter.map((v: any) => ({
                    ..._.omit(v, ["idKelurahan", "kelurahan", "idKecamatan", "kecamatan", "idKabkot", "kabkot", "idProvinsi", "provinsi"]),
                    id: '',
                    idCandidate: request.idCandidate,
                    idProvinsi: v.idProvinsi,
                    idKabkot: v.idKabkot,
                    idKecamatan: v.idKecamatan,
                    idKelurahan: v.idKelurahan,
                    candidate: dCandidate?.name,
                    provinsi: v.provinsi,
                    kabkot: v.kabkot,
                    kecamatan: v.kecamatan,
                    kelurahan: v.kelurahan,
                    date: moment(request.date).format('YYYY-MM-DD'),
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