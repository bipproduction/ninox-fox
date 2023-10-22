'use server'

import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

/**
 * Fungsi untuk menampilkan data download RHI berdasarkan area
 * @param {any} find - berisi idprovinsi, idkabkot, idkecamatan
 * @returns title & data 
 */

export default async function funDownloadRHI({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area

    const nProv = await provinsiCount();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        if (find.idKec == 0 && find.idKabkot == 0) {
            dataTable = await prisma.regionHotIssues.findMany({
                where: {
                    idProvinsi: find.idProvinsi,
                    NOT: {
                        idKabkot: null,
                    },
                    idKecamatan: null,
                    idKelurahan: null
                },
                select: {
                    id: true,
                    description: true,
                    AreaKabkot: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            dataTable = dataTable.map((v: any) => ({
                ..._.omit(v, ["description", "AreaKabkot"]),
                Kabkot: v.AreaKabkot.name,
                description: v.description
            }))

            area = await prisma.areaProvinsi.findUnique({
                where: {
                    id: find.idProvinsi
                }
            })
            titleTrue = "REGION HOT ISSUES - PROVINSI " + area?.name

        } else if (find.idKec == 0 && find.idKabkot > 0) {
            dataTable = await prisma.regionHotIssues.findMany({
                where: {
                    idProvinsi: find.idProvinsi,
                    idKabkot: find.idKabkot,
                    NOT: {
                        idKecamatan: null,
                    },
                    idKelurahan: null
                },
                select: {
                    id: true,
                    description: true,
                    AreaKecamatan: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            dataTable = dataTable.map((v: any) => ({
                ..._.omit(v, ["description", "AreaKecamatan"]),
                Kecamatan: v.AreaKecamatan.name,
                description: v.description
            }))

            area = await prisma.areaKabkot.findUnique({
                where: {
                    id: find.idKabkot
                }
            })
            titleTrue = "REGION HOT ISSUES - " + area?.name

        } else {
            dataTable = await prisma.regionHotIssues.findMany({
                where: {
                    idProvinsi: find.idProvinsi,
                    idKabkot: find.idKabkot,
                    idKecamatan: find.idKec,
                    NOT: {
                        idKelurahan: null
                    },
                },
                select: {
                    id: true,
                    description: true,
                    AreaKelurahan: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            dataTable = dataTable.map((v: any) => ({
                ..._.omit(v, ["description", "AreaKelurahan"]),
                Kelurahan: v.AreaKelurahan.name,
                description: v.description
            }))

            area = await prisma.areaKecamatan.findUnique({
                where: {
                    id: find.idKec
                }
            })
            titleTrue = "REGION HOT ISSUES - KECAMATAN " + area?.name.toUpperCase()

        }

    } else {
        titleTrue = null
        dataTable = []
    }

    const allData = {
        title: titleTrue,
        data: dataTable
    }

    return allData
}