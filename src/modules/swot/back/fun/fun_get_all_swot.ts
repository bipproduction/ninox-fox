"use server"
import { Title } from '@mantine/core';

import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma";
import _ from "lodash"
import moment from 'moment';

/**
 * Fungsi untuk menampilkan swot berdasarkan area
 * @param {any} find - berisi tingkat kandidat, idprovinsi, dan idkabkot
 * @returns data 
 */
export default async function funGetAllSwot({ find, search, order }: { find: any, search?: any, order?: any }) {
    let titleTrue, dataTable = <any>[], area

    const nProv = await provinsiCount();

    const select = {
        id: true,
        content: true,
        category: true,
        createdAt: true,
        updatedAt: true,
        Candidate: {
            select: {
                name: true,
                id: true
            },
        },
    }

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        if (find.tingkat == 1) {
            if (order == "createLama") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
            } else if (order == "updBaru") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi
                        }
                    },
                    orderBy: {
                        updatedAt: 'desc'
                    }
                })
            } else if (order == "updLama") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi
                        }
                    },
                    orderBy: {
                        updatedAt: 'asc'
                    }
                })
            } else if (order == "katAZ") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi
                        }
                    },
                    orderBy: {
                        category: 'asc'
                    }
                })
            } else if (order == "katZA") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi
                        }
                    },
                    orderBy: {
                        category: 'desc'
                    }
                })
            } else {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
            }

            area = await prisma.areaProvinsi.findUnique({
                where: {
                    id: find.idProvinsi
                }
            })
            titleTrue = "PROVINSI " + area?.name

        } else if (find.tingkat == 2) {
            if (order == "createLama") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi,
                            idKabkot: find.idKabkot
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
            } else if (order == "updBaru") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi,
                            idKabkot: find.idKabkot
                        }
                    },
                    orderBy: {
                        updatedAt: 'desc'
                    }
                })
            } else if (order == "updLama") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi,
                            idKabkot: find.idKabkot
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                })
            } else if (order == "katAZ") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi,
                            idKabkot: find.idKabkot
                        }
                    },
                    orderBy: {
                        category: 'asc'
                    }
                })
            } else if (order == "katZA") {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi,
                            idKabkot: find.idKabkot
                        }
                    },
                    orderBy: {
                        category: 'desc'
                    }
                })
            } else {
                dataTable = await prisma.swot.findMany({
                    select: select,
                    where: {
                        content: {
                            contains: search,
                            mode: 'insensitive'
                        },
                        isActive: true,
                        Candidate: {
                            isActive: true,
                            tingkat: find.tingkat,
                            idProvinsi: find.idProvinsi,
                            idKabkot: find.idKabkot
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
            }


            area = await prisma.areaKabkot.findUnique({
                where: {
                    id: find.idKabkot
                }
            })

            titleTrue = "" + area?.name
        }
    } else {
        titleTrue = null;
        dataTable = [];
    }

    const result = dataTable.map((v: any) => ({
        ..._.omit(v, ["Candidate", "createdAt", "updatedAt"]),
        name: v.Candidate?.name,
        idCandidate: v.Candidate.id,
        created: moment(v.createdAt).format("DD-MM-YYYY HH:mm"),
        updated: moment(v.updatedAt).format("DD-MM-YYYY HH:mm"),
    }));

    const allData = {
        title: titleTrue,
        data: result
    }
    return allData

}