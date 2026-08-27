'use server'
import prisma from "@/modules/_global/bin/prisma"
import { funGetUserDefaultFront } from "@/modules/user"
import _ from 'lodash'

export default async function funGetPairingCandidateSummary() {
    const def = await funGetUserDefaultFront()

    const dataCandidatePairing = await prisma.candidatePairing.findMany({
        where: {
            Candidate1: {
                isActive: true,
                idProvinsi: Number(def.idProvinsi),
                idKabkot: def.idKabkot,
                tingkat: def.tingkat
            },
            Candidate2: {
                isActive: true,
                idProvinsi: Number(def.idProvinsi),
                idKabkot: def.idKabkot,
                tingkat: def.tingkat
            },
            dateEmotion: new Date()
        },
        select: {
            rate: true,
            Candidate1: {
                select: {
                    name: true,
                    id: true,
                    img: true,
                }
            },
            Candidate2: {
                select: {
                    name: true,
                    id: true,
                    img: true,
                }
            }
        },
        orderBy: {
            rate: 'desc'
        }
    })

    const dataOmit = dataCandidatePairing.map((v: any) => ({
        ..._.omit(v, ["Candidate1", "Candidate2"]),
        idCandidate1: v.Candidate1.id,
        nameCandidate1: v.Candidate1.name,
        imgCandidate1: v.Candidate1.img,
        idCandidate2: v.Candidate2.id,
        nameCandidate2: v.Candidate2.name,
        imgCandidate2: v.Candidate2.img
    }))

    const multiGroupBy: any = (seq: any, keys: any) => {
        if (!keys.length) return seq;
        var first = keys[0];
        var rest = keys.slice(1);
        return _.mapValues(_.groupBy(seq, first), function (value) {
            return multiGroupBy(value, rest);
        });
    };
    const groupedItems = multiGroupBy(dataOmit, ["idCandidate1", "idCandidate2"]);

    const records = [];

    for (const item in groupedItems) {
        if (groupedItems.hasOwnProperty(item)) {
            for (const elm in groupedItems[item]) {
                const obj = {
                    idCandidate1: groupedItems[item][elm][0].idCandidate1,
                    nameCandidate1: groupedItems[item][elm][0].nameCandidate1,
                    imgCandidate1: groupedItems[item][elm][0].imgCandidate1,
                    idCandidate2: groupedItems[item][elm][0].idCandidate2,
                    nameCandidate2: groupedItems[item][elm][0].nameCandidate2,
                    imgCandidate2: groupedItems[item][elm][0].imgCandidate2,
                    rate: groupedItems[item][elm][0].rate
                };
                records.push(obj);
            }
        }
    }

    const top = _.slice(records, 0, 4)

    return top
}