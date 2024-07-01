'use server'
import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma";
import _ from "lodash"


/**
 * Fungsi untuk menampilkan data audience berdasarkan area
 * @param {any} find - berisi idprovinsi, idkabkot, idkecamatan
 * @returns title & data 
 */

export default async function funGetAudienceByArea({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, th

    const nProv = await provinsiCount();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        if (find.idKec == 0 && find.idKabkot == 0) {
            dataTable = await prisma.audience.findMany({
                where: {
                    idProvinsi: find.idProvinsi
                },
                select: {
                    value: true,
                    valueFilteredMax: true,
                    idKabkot: true,
                    AreaKabkot: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    id: 'asc'
                }
            })

            dataTable = dataTable.map((v: any) => ({
                ..._.omit(v, ["AreaKabkot"]),
                name: v.AreaKabkot.name
            }))

            dataTable = _.map(_.groupBy(dataTable, "idKabkot"), (v: any) => ({
                value: _.sumBy(v, 'value'),
                valueFilteredMax: _.sumBy(v, 'valueFilteredMax'),
                name: v[0].name
            }))

            area = await prisma.areaProvinsi.findUnique({
                where: {
                    id: find.idProvinsi
                }
            })
            titleTrue = "PROVINSI " + area?.name
            th = "KABUPATEN/KOTA"

        } else if (find.idKec == 0 && find.idKabkot > 0) {
            dataTable = await prisma.audience.findMany({
                where: {
                    idKabkot: find.idKabkot
                },
                select: {
                    value: true,
                    valueFilteredMax: true,
                    idKecamatan: true,
                    AreaKecamatan: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    id: 'asc'
                }
            })

            dataTable = dataTable.map((v: any) => ({
                ..._.omit(v, ["AreaKecamatan"]),
                name: v.AreaKecamatan.name
            }))

            dataTable = _.map(_.groupBy(dataTable, "idKecamatan"), (v: any) => ({
                value: _.sumBy(v, 'value'),
                valueFilteredMax: _.sumBy(v, 'valueFilteredMax'),
                name: v[0].name
            }))

            area = await prisma.areaKabkot.findUnique({
                where: {
                    id: find.idKabkot
                }
            })
            titleTrue = "" + area?.name
            th = "KECAMATAN"

        } else {
            dataTable = await prisma.audience.findMany({
                where: {
                    idKecamatan: find.idKec
                },
                select: {
                    value: true,
                    valueFilteredMax: true,
                    AreaKelurahan: {
                        select: {
                            name: true,
                        }
                    }
                },
                orderBy: {
                    id: 'asc'
                }
            })

            dataTable = dataTable.map((v: any) => ({
                ..._.omit(v, ["AreaKelurahan"]),
                name: v.AreaKelurahan.name
            }))

            area = await prisma.areaKecamatan.findUnique({
                where: {
                    id: find.idKec
                }
            })
            titleTrue = "KECAMATAN " + area?.name.toUpperCase()
            th = "KELURAHAN"

        }

    } else {
        dataTable = await prisma.audience.findMany({
            select: {
                value: true,
                valueFilteredMax: true,
                idProvinsi: true,
                AreaProvinsi: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                id: 'asc'
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["AreaProvinsi"]),
            name: v.AreaProvinsi.name
        }))

        dataTable = _.map(_.groupBy(dataTable, "idProvinsi"), (v: any) => ({
            value: _.sumBy(v, 'value'),
            valueFilteredMax: _.sumBy(v, 'valueFilteredMax'),
            name: v[0].name
        }))

        titleTrue = "SELURUH INDONESIA"
        // dataTable = []
        th = "PROVINSI"
    }

    const allData = {
        title: titleTrue,
        thTitle: th,
        data: dataTable
    }


    return allData
}