'use server'

import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

/**
 * Fungsi untuk menampilkan data download audience berdasarkan area
 * @param {any} find - berisi idprovinsi, idkabkot, idkecamatan
 * @returns title & data 
 */

export default async function funDownloadAudience({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, kondisi

    const nProv = await provinsiCount();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        if (find.idKec == 0 && find.idKabkot == 0) {
            kondisi = {
                idProvinsi: find.idProvinsi
            }

            area = await prisma.areaProvinsi.findUnique({
                where: {
                    id: find.idProvinsi
                }
            })
            titleTrue = "AUDIENCE - PROVINSI " + area?.name

        } else if (find.idKec == 0 && find.idKabkot > 0) {
            kondisi = {
                idProvinsi: find.idProvinsi,
                idKabkot: find.idKabkot
            }

            area = await prisma.areaKabkot.findUnique({
                where: {
                    id: find.idKabkot
                }
            })
            titleTrue = "AUDIENCE - " + area?.name

        } else {
            kondisi = {
                idProvinsi: find.idProvinsi,
                idKabkot: find.idKabkot,
                idKecamatan: find.idKec,
            }
            area = await prisma.areaKecamatan.findUnique({
                where: {
                    id: find.idKec
                }
            })
            titleTrue = "AUDIENCE - KECAMATAN " + area?.name.toUpperCase()

        }

        dataTable = await prisma.audience.findMany({
            where: kondisi,
            select: {
                id: true,
                value: true,
                valueFilteredMax: true,
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
            },
            orderBy: {
                id: 'asc',
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["value", "valueFilteredMax", "AreaProvinsi", "AreaKabkot", "AreaKecamatan", "AreaKelurahan"]),
            Provinsi: v.AreaProvinsi.name,
            Kabkot: v.AreaKabkot.name,
            Kecamatan: v.AreaKecamatan.name,
            // Kelurahan: v.AreaKelurahan.name,
            value: v.value,
            valueFilteredMax: v.valueFilteredMax
        }))

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