'use server'

import prisma from "@/modules/_global/bin/prisma";
import _ from "lodash"

export default async function funSeederPct() {
    const cek = await prisma.publicConcernTrendFix.count()
    if (cek > 0) {
        const upd = await prisma.publicConcernTrendFix.updateMany({
            data: {
                pendidikan: 0,
                infrastruktur: 0,
                layananKesehatan: 0,
                kemiskinan: 0,
                lapanganPekerjaan: 0,
                keadilanSosial: 0
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
            pendidikan: 0,
            infrastruktur: 0,
            layananKesehatan: 0,
            kemiskinan: 0,
            lapanganPekerjaan: 0,
            keadilanSosial: 0
        }));


        const ins = await prisma.publicConcernTrendFix.createMany({
            data: wilayahTrue
        })
    }
    
    return {
        success: true,
        message: "Seeder Tren Perhatian Publik"
    }
}