'use server'

import prisma from "@/modules/_global/bin/prisma";
import { AnyCnameRecord } from "dns";
import _ from "lodash"

export default async function funSeederRhi() {

    const cek = await prisma.regionHotIssues.count()
    if (cek > 0) {
        const upd = await prisma.regionHotIssues.updateMany({
            data: {
                description: '-'
            }
        })
    } else {
        const dataProv = await prisma.areaProvinsi.findMany({
            select: {
                id: true
            }
        })

        const dataKabkot = await prisma.areaKabkot.findMany({
            select: {
                id: true,
                idProvinsi: true,
            }
        })

        const dataKecamatan = await prisma.areaKecamatan.findMany({
            select: {
                id: true,
                AreaKabkot: {
                    select: {
                        id: true,
                        AreaProvinsi: {
                            select: {
                                id: true,
                            }
                        }
                    }
                }
            }
        })


        const dataKelurahan = await prisma.areaKelurahan.findMany({
            select: {
                id: true,
                AreaKecamatan: {
                    select: {
                        id: true,
                        AreaKabkot: {
                            select: {
                                id: true,
                                AreaProvinsi: {
                                    select: {
                                        id: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })


        const wilayahTrueProv = dataProv.map((v: any) => ({
            ..._.omit(v, ["id"]),
            idProvinsi: v.id,
            description: '-'
        }));

        const wilayahTrueKabkot = dataKabkot.map((v: any) => ({
            ..._.omit(v, ["id"]),
            idKabkot: v.id,
            idProvinsi: v.idProvinsi,
            description: '-'
        }));

        const wilayahTrueKec = dataKecamatan.map((v: any) => ({
            ..._.omit(v, ["id", "AreaKabkot", "AreaProvinsi"]),
            idKecamatan: v.id,
            idKabkot: v.AreaKabkot.id,
            idProvinsi: v.AreaKabkot.AreaProvinsi.id,
            description: '-'
        }));


        const wilayahTrueKel = dataKelurahan.map((v: any) => ({
            ..._.omit(v, ["id", "AreaKecamatan", "AreaKabkot", "AreaProvinsi"]),
            idKelurahan: v.id,
            idKecamatan: v.AreaKecamatan.id,
            idKabkot: v.AreaKecamatan.AreaKabkot.id,
            idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
            description: '-'
        }));


        await prisma.regionHotIssues.createMany({
            data: wilayahTrueProv
        })

        await prisma.regionHotIssues.createMany({
            data: wilayahTrueKabkot
        })

        await prisma.regionHotIssues.createMany({
            data: wilayahTrueKec
        })

        await prisma.regionHotIssues.createMany({
            data: wilayahTrueKel
        })
    }

    return {
        success: true,
        message: "Seeder Value Isu Wilayah"
    }
}