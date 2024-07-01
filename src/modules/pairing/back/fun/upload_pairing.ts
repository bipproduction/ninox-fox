'use server'
import prisma from "@/modules/_global/bin/prisma";
import moment from "moment";
import { revalidatePath } from "next/cache";

export default async function funUploadPairing({ body }: { body: any }) {
    let date, can1, can2, prov, city

    for (let i of body) {
        date = moment(i.date).format('YYYY-MM-DD');
        can1 = i.idCandidate1
        can2 = i.idCandidate2
        prov = i.idProvinsi
        city = i.idKabkot

        if (i.id == "") {
            const cek = await prisma.candidatePairing.count({
                where: {
                    idCandidate1: i.idCandidate1,
                    idCandidate2: i.idCandidate2,
                    dateEmotion: new Date(i.date),
                    idProvinsi: Number(i.idProvinsi),
                    idKabkot: Number(i.idKabkot),
                    idKecamatan: (i.idKecamatan == '' ? null : Number(i.idKecamatan)),
                }
            })

            if (cek == 0) {
                await prisma.candidatePairing.create({
                    data: {
                        idCandidate1: i.idCandidate1,
                        idCandidate2: i.idCandidate2,
                        idProvinsi: Number(i.idProvinsi),
                        idKabkot: Number(i.idKabkot),
                        idKecamatan: (i.idKecamatan == '' ? null : Number(i.idKecamatan)),
                        dateEmotion: new Date(i.date),
                        rate: Number(i.rate),
                        confidence: Number(i.PotensiMendukungFix),
                        supportive: Number(i.PotensiMendukungBerubah),
                        positive: Number(i.MempertimbangkanFix),
                        undecided: Number(i.MempertimbangkanBerubah),
                        unsupportive: Number(i.TidakTahuFix),
                        uncomfortable: Number(i.TidakTahuBerubah),
                        negative: Number(i.PotensiTidakMendukungFix),
                        dissapproval: Number(i.PotensiTidakMendukungBerubah)

                    }
                });
            }
        } else {
            await prisma.candidatePairing.update({
                where: {
                    id: i.id
                },
                data: {
                    // idCandidate1: i.idCandidate1,
                    // idCandidate2: i.idCandidate2,
                    rate: Number(i.rate),
                    confidence: Number(i.PotensiMendukungFix),
                    supportive: Number(i.PotensiMendukungBerubah),
                    positive: Number(i.MempertimbangkanFix),
                    undecided: Number(i.MempertimbangkanBerubah),
                    unsupportive: Number(i.TidakTahuFix),
                    uncomfortable: Number(i.TidakTahuBerubah),
                    negative: Number(i.PotensiTidakMendukungFix),
                    dissapproval: Number(i.PotensiTidakMendukungBerubah)

                }
            });
        }
    }

    revalidatePath(`dashboard/pairing?prov=${prov}&city=${city}&can1=${can1}&can2=${can2}&date=${date}`)

    return {
        success: true,
        message: 'Sukses'
    }
}