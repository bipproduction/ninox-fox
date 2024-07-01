'use server'
import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

/**
 * Fungsi untuk menampilkan data download LTA berdasarkan area
 * @param {any} find - berisi idprovinsi, idkabkot, idkecamatan
 * @returns title & data 
 */

export default async function funDownloadLTA({ find }: { find: any }) {
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
            titleTrue = "PENILAIAN SIFAT PEMIMPIN - PROVINSI " + area?.name

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
            titleTrue = "PENILAIAN SIFAT PEMIMPIN - " + area?.name

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
            titleTrue = "PENILAIAN SIFAT PEMIMPIN - KECAMATAN " + area?.name.toUpperCase()

        }

        dataTable = await prisma.leaderTraitAssessmentFix.findMany({
            where: kondisi,
            select: {
                id: true,
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
                },
                pekerjaKeras: true,
                cerdas: true,
                jujur: true,
                merakyat: true,
                tegas: true,
                berpengalamanMemimpin: true,
                berprestasi: true,
                latarBelakangMiliter: true,
                agamis: true,
            },
            orderBy: {
                id: 'asc',
            }
        })

        dataTable = dataTable.map((v: any) => ({
            ..._.omit(v, ["pekerjaKeras", "cerdas", "jujur", "merakyat", "tegas", "berpengalamanMemimpin", "berprestasi", "latarBelakangMiliter", "agamis", "AreaProvinsi", "AreaKabkot", "AreaKecamatan", "AreaKelurahan"]),
            Provinsi: v.AreaProvinsi.name,
            Kabkot: v.AreaKabkot.name,
            Kecamatan: v.AreaKecamatan.name,
            Kelurahan: v.AreaKelurahan.name,
            pekerjaKeras: v.pekerjaKeras,
            cerdas: v.cerdas,
            jujur: v.jujur,
            merakyat: v.merakyat,
            tegas: v.tegas,
            berpengalamanMemimpin: v.berpengalamanMemimpin,
            berprestasi: v.berprestasi,
            latarBelakangMiliter: v.latarBelakangMiliter,
            agamis: v.agamis,
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