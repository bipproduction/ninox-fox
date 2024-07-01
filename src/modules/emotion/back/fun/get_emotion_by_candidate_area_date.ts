'use server'
import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash";

/**
 * Fungsi untuk menampilkan emotion candidate berdasarkan area, candidate dan tanggal
 * @param {any} find - berisi tingkat kandidat, idprovinsi, dan idkabkot
 * @returns title & data 
 */

export default async function funGetEmotionByCandidateAreaDate({ find }: { find: any }) {
    let titleTrue, dataTable = <any>[], area, th, result = <any>[]

    const nProv = await provinsiCount();

    if (find.idProvinsi > 0 && find.idProvinsi <= nProv) {
        const dataCandidate = await prisma.candidate.findUnique({
            where: {
                id: find.idCandidate
            }
        })
        if (find.tingkat == 1) {
            dataTable = await prisma.candidateEmotion.findMany({
                where: {
                    idCandidate: String(find.idCandidate),
                    isActive: true,
                    dateEmotion: new Date(find.date)

                },
                select: {
                    dateEmotion: true,
                    confidence: true,
                    supportive: true,
                    positive: true,
                    undecided: true,
                    unsupportive: true,
                    uncomfortable: true,
                    negative: true,
                    dissapproval: true,
                    idKabkot: true,
                    AreaKabkot: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            result = dataTable.map((v: any) => ({
                ..._.omit(v, ["AreaKabkot"]),
                name: v.AreaKabkot.name
            }))

            result = _.map(_.groupBy(result, "idKabkot"), (v: any) => ({
                name: _.toString(v[0].name),
                confidence: _.sumBy(v, 'confidence'),
                dissapproval: _.sumBy(v, 'dissapproval'),
                negative: _.sumBy(v, 'negative'),
                positive: _.sumBy(v, 'positive'),
                supportive: _.sumBy(v, 'supportive'),
                uncomfortable: _.sumBy(v, 'uncomfortable'),
                undecided: _.sumBy(v, 'undecided'),
                unsupportive: _.sumBy(v, 'unsupportive'),
            }))

            area = await prisma.areaProvinsi.findUnique({
                where: {
                    id: find.idProvinsi
                }
            })
            titleTrue = dataCandidate?.name + " (" + find.date + ")"
            th = "KABKOT"

        } else if (find.tingkat == 2) {
            dataTable = await prisma.candidateEmotion.findMany({
                where: {
                    idCandidate: String(find.idCandidate),
                    isActive: true,
                    dateEmotion: new Date(find.date)

                },
                select: {
                    dateEmotion: true,
                    confidence: true,
                    supportive: true,
                    positive: true,
                    undecided: true,
                    unsupportive: true,
                    uncomfortable: true,
                    negative: true,
                    dissapproval: true,
                    idKecamatan: true,
                    AreaKecamatan: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            result = dataTable.map((v: any) => ({
                ..._.omit(v, ["AreaKecamatan"]),
                name: v.AreaKecamatan.name
            }))

            result = _.map(_.groupBy(result, "idKecamatan"), (v: any) => ({
                name: _.toString(v[0].name),
                confidence: _.sumBy(v, 'confidence'),
                dissapproval: _.sumBy(v, 'dissapproval'),
                negative: _.sumBy(v, 'negative'),
                positive: _.sumBy(v, 'positive'),
                supportive: _.sumBy(v, 'supportive'),
                uncomfortable: _.sumBy(v, 'uncomfortable'),
                undecided: _.sumBy(v, 'undecided'),
                unsupportive: _.sumBy(v, 'unsupportive'),
            }))

            area = await prisma.areaKabkot.findUnique({
                where: {
                    id: find.idKabkot
                }
            })

            titleTrue = dataCandidate?.name + " (" + find.date + ")"
            th = "KECAMATAN"
        }
    } else {
        titleTrue = null;
        dataTable = [];
    }


    const allData = {
        title: titleTrue,
        data: result,
        th: th
    }

    return allData
}