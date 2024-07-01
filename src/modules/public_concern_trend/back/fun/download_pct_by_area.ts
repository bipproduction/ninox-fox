'use server'
import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

/**
 * Fungsi untuk menampilkan data download pct berdasarkan area
 * @param {any} find - berisi idprovinsi, idkabkot, idkecamatan
 * @returns title & data 
 */

export default async function funDownloadPCT({ find }: { find: any }) {
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
            titleTrue = "TREN PERHATIAN PUBLIK - PROVINSI " + area?.name

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
            titleTrue = "TREN PERHATIAN PUBLIK - " + area?.name

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
            titleTrue = "TREN PERHATIAN PUBLIK - KECAMATAN " + area?.name.toUpperCase()

        }

        dataTable = await prisma.publicConcernTrendFix.findMany({
            where: kondisi,
            select: {
                id: true,
                infrastruktur: true,
                keadilanSosial: true,
                kemiskinan: true,
                lapanganPekerjaan: true,
                layananKesehatan: true,
                pendidikan: true,
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
            ..._.omit(v, ["infrastruktur", "keadilanSosial", "kemiskinan", "lapanganPekerjaan", "layananKesehatan", "pendidikan", "value", "AreaProvinsi", "AreaKabkot", "AreaKecamatan", "AreaKelurahan"]),
            Provinsi: v.AreaProvinsi.name,
            Kabkot: v.AreaKabkot.name,
            Kecamatan: v.AreaKecamatan.name,
            Kelurahan: v.AreaKelurahan.name,
            pendidikan: v.pendidikan,
            infrastruktur: v.infrastruktur,
            layananKesehatan: v.layananKesehatan,
            kemiskinan: v.kemiskinan,
            keadilanSosial: v.keadilanSosial,
            lapanganPekerjaan: v.lapanganPekerjaan,
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