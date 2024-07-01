"use server"

import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from "moment";


/**
 * Fungsi untuk menampilkan stap berdasarkan area
 * @param {any} find - berisi tingkat kandidat, idprovinsi, dan idkabkot
 * @returns data 
 */
export default async function funGetAllStap({ find, search, order }: { find: any, search?: any, order?: any }) {
    let titleTrue, dataTable = <any>[], area

    const nProv = await provinsiCount();

    const select = {
        id: true,
        content: true,
        category: true,
        sentiment: true,
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
                dataTable = await prisma.step.findMany({
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
                dataTable = await prisma.step.findMany({
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
                dataTable = await prisma.step.findMany({
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
            } else if (order == "katAZ") {
                dataTable = await prisma.step.findMany({
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
                dataTable = await prisma.step.findMany({
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
            } else if (order == "sentimentAZ") {
                dataTable = await prisma.step.findMany({
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
                        sentiment: 'desc'
                    }
                })
            } else if (order == "sentimentZA") {
                dataTable = await prisma.step.findMany({
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
                        sentiment: 'asc'
                    }
                })
            } else {
                dataTable = await prisma.step.findMany({
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
                dataTable = await prisma.step.findMany({
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
                dataTable = await prisma.step.findMany({
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
                dataTable = await prisma.step.findMany({
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
                        updatedAt: 'asc'
                    }
                })
            } else if (order == "katAZ") {
                dataTable = await prisma.step.findMany({
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
                dataTable = await prisma.step.findMany({
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
            } else if (order == "sentimentAZ") {
                dataTable = await prisma.step.findMany({
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
                        sentiment: 'desc'
                    }
                })
            } else if (order == "sentimentZA") {
                dataTable = await prisma.step.findMany({
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
                        sentiment: 'asc'
                    }
                })
            } else {
                dataTable = await prisma.step.findMany({
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
        idCandidate: v.Candidate?.id,
        created: moment(v.createdAt).format('DD-MM-YYYY HH:mm'),
        updated: moment(v.updatedAt).format('DD-MM-YYYY HH:mm'),
    }));

    const allData = {
        title: titleTrue,
        data: result
    }
    return allData
}