'use server'

import prisma from "@/modules/_global/bin/prisma";
import _ from "lodash"

export default async function funSeederLta() {
    const cek = await prisma.leaderTraitAssessmentFix.count()
    if (cek > 0) {
        const upd = await prisma.leaderTraitAssessmentFix.updateMany({
            data: {
                pekerjaKeras: 0,
                cerdas: 0,
                jujur: 0,
                merakyat: 0,
                tegas: 0,
                berpengalamanMemimpin: 0,
                berprestasi: 0,
                latarBelakangMiliter: 0,
                agamis: 0
            }
        })
    } else {
        const dataWilayah = await prisma.areaKelurahan.findMany({
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

        const wilayahTrue = dataWilayah.map((v: any) => ({
            ..._.omit(v, ["id", "AreaKecamatan", "AreaKabkot", "AreaProvinsi"]),
            idKelurahan: v.id,
            idKecamatan: v.AreaKecamatan.id,
            idKabkot: v.AreaKecamatan.AreaKabkot.id,
            idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
            pekerjaKeras: 0,
            cerdas: 0,
            jujur: 0,
            merakyat: 0,
            tegas: 0,
            berpengalamanMemimpin: 0,
            berprestasi: 0,
            latarBelakangMiliter: 0,
            agamis: 0
        }));


        const ins = await prisma.leaderTraitAssessmentFix.createMany({
            data: wilayahTrue
        })
    }

    return {
        success: true,
        message: "Seeder Value Penilaian Sifat Pemimpin"
    }
}