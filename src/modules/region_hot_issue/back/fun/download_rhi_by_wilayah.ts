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
                    AreaProvinsi: {
                        select: {
                            name: true
                        }
                    },
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
                ..._.omit(v, ["description", "AreaProvinsi", "AreaKabkot"]),
                Provinsi: v.AreaProvinsi.name,
                Kabkot: v.AreaKabkot.name,
                Kecamatan: "",
                Kelurahan: "",
                description: v.description
            }))

            area = await prisma.areaProvinsi.findUnique({
                where: {
                    id: find.idProvinsi
                }
            })
            titleTrue = "ISU WILAYAH - PROVINSI " + area?.name

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
                    AreaProvinsi: {
                        select: {
                            name: true
                        }
                    },
                    AreaKabkot: {
                        select: {
                            name: true
                        }
                    },
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
                ..._.omit(v, ["description", "AreaProvinsi", "AreaKabkot", "AreaKecamatan"]),
                Provinsi: v.AreaProvinsi.name,
                Kabkot: v.AreaKabkot.name,
                Kecamatan: v.AreaKecamatan.name,
                Kelurahan: "",
                description: v.description
            }))

            area = await prisma.areaKabkot.findUnique({
                where: {
                    id: find.idKabkot
                }
            })
            titleTrue = "ISU WILAYAH - " + area?.name

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
                    AreaProvinsi: {
                        select: {
                            name: true
                        }
                    },
                    AreaKabkot: {
                        select: {
                            name: true
                        }
                    },
                    AreaKecamatan: {
                        select: {
                            name: true
                        }
                    },
                    AreaKelurahan: {
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
                ..._.omit(v, ["description", "AreaProvinsi", "AreaKabkot", "AreaKecamatan", "AreaKelurahan"]),
                Provinsi: v.AreaProvinsi.name,
                Kabkot: v.AreaKabkot.name,
                Kecamatan: v.AreaKecamatan.name,
                Kelurahan: v.AreaKelurahan.name,
                description: v.description
            }))

            area = await prisma.areaKecamatan.findUnique({
                where: {
                    id: find.idKec
                }
            })
            titleTrue = "ISU WILAYAH - KECAMATAN " + area?.name.toUpperCase()

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