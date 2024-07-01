'use server'
import prisma from "@/modules/_global/bin/prisma";
import moment from "moment";
import { revalidatePath } from "next/cache";

export default async function funUploadEmotion({ body }: { body: any }) {
    let date, can, prov, city

    for (let i of body) {
        date = moment(i.date).format('YYYY-MM-DD');
        can = i.idCandidate
        prov = i.idProvinsi
        city = i.idKabkot

        if (i.id == "") {
            const cek = await prisma.candidateEmotion.count({
                where: {
                    idCandidate: i.idCandidate,
                    dateEmotion: new Date(i.date),
                    idProvinsi: Number(i.idProvinsi),
                    idKabkot: Number(i.idKabkot),
                    idKecamatan: Number(i.idKecamatan),
                    idKelurahan: Number(i.idKelurahan),
                }
            })

            if (cek == 0) {
                await prisma.candidateEmotion.create({
                    data: {
                        idCandidate: i.idCandidate,
                        idProvinsi: Number(i.idProvinsi),
                        idKabkot: Number(i.idKabkot),
                        idKecamatan: Number(i.idKecamatan),
                        idKelurahan: Number(i.idKelurahan),
                        dateEmotion: new Date(i.date),
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
            await prisma.candidateEmotion.update({
                where: {
                    id: i.id
                },
                data: {
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

    revalidatePath(`dashboard/emotion?prov=${prov}&city=${city}&can=${can}&date=${date}`)

    return {
        success: true,
        message: 'Sukses'
    }
}