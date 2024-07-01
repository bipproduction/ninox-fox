"use server"
import prisma from "@/modules/_global/bin/prisma"
import { funLogUser } from "@/modules/user"
import { revalidatePath } from "next/cache"

/**
 * Fungsi untuk create swot
 * @param {Swot} body - berisi name, idprovinsi, idkabkot, tingkat
 * @returns success - true 
 */

export default async function funAddSwotf({ body, S, W, O, T }: { body: any, S: any, W: any, O: any, T: any }) {
    let data

    // STRENGTH
    if (S != '' && S != '<p></p>') {
        data = await prisma.swot.create({
            data: {
                idCandidate: body.idCandidate,
                category: 'STRENGTH',
                content: S
            },
            select: {
                id: true,
                Candidate: {
                    select: {
                        name: true,
                        AreaKabkot: {
                            select: {
                                name: true
                            }
                        },
                        AreaProvinsi: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        await funLogUser({ act: 'ADD', desc: `User menambah data SWOT`, idContent: data?.id, tbContent: 'swot' })
    }

    // WEAKNESS
    if (W != '' && W != '<p></p>') {
        data = await prisma.swot.create({
            data: {
                idCandidate: body.idCandidate,
                category: 'WEAKNESS',
                content: W
            },
            select: {
                id: true,
                Candidate: {
                    select: {
                        name: true,
                        AreaKabkot: {
                            select: {
                                name: true
                            }
                        },
                        AreaProvinsi: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        await funLogUser({ act: 'ADD', desc: `User menambah data SWOT`, idContent: data?.id, tbContent: 'swot' })
    }

    // OPPORTUNITY
    if (O != '' && O != '<p></p>') {
        data = await prisma.swot.create({
            data: {
                idCandidate: body.idCandidate,
                category: 'OPPORTUNITY',
                content: O
            },
            select: {
                id: true,
                Candidate: {
                    select: {
                        name: true,
                        AreaKabkot: {
                            select: {
                                name: true
                            }
                        },
                        AreaProvinsi: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        await funLogUser({ act: 'ADD', desc: `User menambah data SWOT`, idContent: data?.id, tbContent: 'swot' })
    }

    // THREAT
    if (T != '' && T != '<p></p>') {
        data = await prisma.swot.create({
            data: {
                idCandidate: body.idCandidate,
                category: 'THREAT',
                content: T
            },
            select: {
                id: true,
                Candidate: {
                    select: {
                        name: true,
                        AreaKabkot: {
                            select: {
                                name: true
                            }
                        },
                        AreaProvinsi: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        await funLogUser({ act: 'ADD', desc: `User menambah data SWOT`, idContent: data?.id, tbContent: 'swot' })
    }


    revalidatePath("dashboard/swot?prov" + data?.Candidate.AreaProvinsi + "&city" + data?.Candidate.AreaKabkot)

    return {
        success: true,
        // data: data.id,
        message: "Success"
    }
}