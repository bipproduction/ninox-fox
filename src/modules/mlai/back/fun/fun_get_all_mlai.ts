'use server'
import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"
import moment from 'moment';

/**
 * Fungsi untuk menampilkan ml ai berdasarkan area
 * @param {any} find - berisi tingkat kandidat, idprovinsi, dan idkabkot
 * @returns data 
 */
export default async function funGetAllMlAi({ find }: { find: any }) {

    let titleTrue, dataTable = <any>[], area

    const nProv = await provinsiCount();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        if (find.tingkat == 1) {
            dataTable = await prisma.mlAi.findMany({
                select: {
                    id: true,
                    content: true,
                    timeContent: true,
                    dateContent: true,
                    Candidate: {
                        select: {
                            name: true,
                            id: true
                        },
                    },
                },
                where: {
                    isActive: true,
                    Candidate: {
                        isActive: true,
                        tingkat: find.tingkat,
                        idProvinsi: find.idProvinsi
                    }
                },
                orderBy: {
                    id: 'asc'
                }
            })

            area = await prisma.areaProvinsi.findUnique({
                where: {
                    id: find.idProvinsi
                }
            })
            titleTrue = "PROVINSI " + area?.name

        } else if (find.tingkat == 2) {
            dataTable = await prisma.mlAi.findMany({
                select: {
                    id: true,
                    content: true,
                    timeContent: true,
                    dateContent: true,
                    Candidate: {
                        select: {
                            name: true,
                            id: true
                        },
                    },
                },
                where: {
                    isActive: true,
                    Candidate: {
                        isActive: true,
                        tingkat: find.tingkat,
                        idProvinsi: find.idProvinsi,
                        idKabkot: find.idKabkot
                    }
                },
                orderBy: {
                    id: 'asc'
                }
            })

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
        ..._.omit(v, ["Candidate", "timeContent", "dateContent"]),
        name: v.Candidate?.name,
        idCandidate: v.Candidate.id,
        dateContent: moment(v.dateContent).format('DD-MM-YYYY'),
        timeContent: moment.utc(v.timeContent).format('HH:mm'),
    }));

    const allData = {
        title: titleTrue,
        data: result
    }
    return allData
}