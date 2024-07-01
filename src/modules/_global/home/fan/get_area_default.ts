"use server"
import { cookies } from "next/headers"
import { unsealData } from "iron-session"
import { pwd_key_config } from "../../bin/val_global"
import prisma from "../../bin/prisma"
import _ from "lodash"

export default async function funGetAreaDefault() {
    const c = cookies().get("_cookiesNinox")
    const dataCookies = await unsealData(c!.value, { password: pwd_key_config as string })

    const dataArea = await prisma.userArea.findFirst({
        where: {
            idUser: String(dataCookies),
            isFront: true
        },
        select: {
            id: true,
            idKabkot: true,
            idProvinsi: true,
            idCandidate: true,
        }
    })

    let data, hasil = "-"

    if (dataArea) {
        if (dataArea?.idKabkot == null) {
            data = await prisma.userArea.findFirst({
                where: {
                    idUser: String(dataCookies),
                    isFront: true
                },
                select: {
                    AreaProvinsi: {
                        select: {
                            name: true
                        }
                    },
                    Candidate: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            if (!_.isUndefined(data?.Candidate?.name)) {
                hasil = data?.AreaProvinsi?.name + ' - ' + data?.Candidate?.name
            } else {
                const kandidat = await prisma.candidate.findFirst({
                    where: {
                        isActive: true,
                        idProvinsi: Number(dataArea?.idProvinsi),
                        idKabkot: null,
                        tingkat: 1
                    },
                    orderBy: {
                        name: 'asc'
                    }
                })

                hasil = data?.AreaProvinsi?.name + ' - ' + kandidat?.name
            }

        } else {
            data = await prisma.userArea.findFirst({
                where: {
                    idUser: String(dataCookies),
                    isFront: true
                },
                select: {
                    AreaKabkot: {
                        select: {
                            name: true
                        }
                    },
                    Candidate: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            if (!_.isUndefined(data?.Candidate?.name)) {
                hasil = data?.AreaKabkot?.name + ' - ' + data?.Candidate?.name
            } else {
                const kandidat = await prisma.candidate.findFirst({
                    where: {
                        isActive: true,
                        idProvinsi: Number(dataArea?.idProvinsi),
                        idKabkot: Number(dataArea?.idKabkot),
                        tingkat: 2
                    },
                    orderBy: {
                        name: 'asc'
                    }
                })

                hasil = data?.AreaKabkot?.name + ' - ' + kandidat?.name
            }
        }
    }

    return hasil
}