'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

export default async function funGetEmotionTableNew({ candidate }: { candidate: any }) {
    let result = <any>[], dataC = null


    if (!_.isNull(candidate) && !_.isUndefined(candidate)) {
        dataC = await prisma.candidate.findUnique({
            where: {
                id: candidate
            }
        })
    }


    if (dataC?.tingkat == 1) {
        const data = await prisma.candidateEmotion.findMany({
            where: {
                idCandidate: candidate,
                dateEmotion: new Date()
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

        const format = data.map((v: any) => ({
            ..._.omit(v, ["AreaKabkot"]),
            name: v.AreaKabkot.name
        }))

        result = _.map(_.groupBy(format, "idKabkot"), (v: any) => ({
            idArea: v[0].idKabkot,
            name: _.toString(v[0].name),
            mendukung: _.sumBy(v, 'confidence') + _.sumBy(v, 'supportive'),
            mempertimbangkan: _.sumBy(v, 'positive') + _.sumBy(v, 'undecided'),
            tidaktahu: _.sumBy(v, 'unsupportive') + _.sumBy(v, 'uncomfortable'),
            tidakmendukung: _.sumBy(v, 'negative') + _.sumBy(v, 'dissapproval'),
            filtered: _.sum([
                _.sumBy(v, 'confidence'),
                _.sumBy(v, 'dissapproval'),
                _.sumBy(v, 'negative'),
                _.sumBy(v, 'positive'),
                _.sumBy(v, 'supportive'),
                _.sumBy(v, 'uncomfortable'),
                _.sumBy(v, 'undecided'),
                _.sumBy(v, 'unsupportive'),
            ])
        }))

    } else if (dataC?.tingkat == 2) {
        const data = await prisma.candidateEmotion.findMany({
            where: {
                idCandidate: candidate,
                dateEmotion: new Date()
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

        const format = data.map((v: any) => ({
            ..._.omit(v, ["AreaKecamatan"]),
            name: v.AreaKecamatan.name
        }))

        result = _.map(_.groupBy(format, "idKecamatan"), (v: any) => ({
            idArea: v[0].idKecamatan,
            name: _.toString(v[0].name),
            mendukung: _.sumBy(v, 'confidence') + _.sumBy(v, 'supportive'),
            mempertimbangkan: _.sumBy(v, 'positive') + _.sumBy(v, 'undecided'),
            tidaktahu: _.sumBy(v, 'unsupportive') + _.sumBy(v, 'uncomfortable'),
            tidakmendukung: _.sumBy(v, 'negative') + _.sumBy(v, 'dissapproval'),
            filtered: _.sum([
                _.sumBy(v, 'confidence'),
                _.sumBy(v, 'dissapproval'),
                _.sumBy(v, 'negative'),
                _.sumBy(v, 'positive'),
                _.sumBy(v, 'supportive'),
                _.sumBy(v, 'uncomfortable'),
                _.sumBy(v, 'undecided'),
                _.sumBy(v, 'unsupportive'),
            ])
        }))
    }

    const sortData = _.orderBy(result, "mendukung", 'desc').map((v, i) => ({
        idArea: v.idArea,
        name: v.name,
        mendukung: v.mendukung,
        mempertimbangkan: v.mempertimbangkan,
        tidaktahu: v.tidaktahu,
        tidakmendukung: v.tidakmendukung,
        filtered: v.filtered
    }))

    return sortData
}