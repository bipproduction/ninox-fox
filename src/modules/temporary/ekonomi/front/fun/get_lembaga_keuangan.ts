'use server'
import { provinsiCount } from "@/modules/_global";
import prisma from "@/modules/_global/bin/prisma";
import _ from "lodash";

export default async function funGetFrontLembagaKeuangan({ prov, kab, kec }: { prov: any, kab?: any, kec?: any }) {
    const nProv = await provinsiCount()

    if (prov > 0 && prov <= nProv) {
        if (_.isNull(kab) && _.isNull(kec)) {
            // tingkat provinsi
            const data = await prisma.sE_Ekonomi_LembagaKeuangan.findMany({
                where: {
                    idProvinsi: Number(prov)
                }
            })
            const dataTable = _.map(_.groupBy(data, "idProvinsi"), (v: any) => ({
                bankUmumPemerintah: _.sumBy(v, 'bankUmumPemerintah'),
                bankUmumSwasta: _.sumBy(v, 'bankUmumSwasta'),
                bankPengkreditanRakyat: _.sumBy(v, 'bankPengkreditanRakyat'),
                koperasiSimpanPinjam: _.sumBy(v, 'koperasiSimpanPinjam'),
            }))

            return dataTable
        } else if (!_.isNull(kab) && _.isNull(kec)) {
            // tingkat kabkot
            const data = await prisma.sE_Ekonomi_LembagaKeuangan.findMany({
                where: {
                    idProvinsi: Number(prov),
                    idKabkot: Number(kab)
                }
            })
            const dataTable = _.map(_.groupBy(data, "idKabkot"), (v: any) => ({
                bankUmumPemerintah: _.sumBy(v, 'bankUmumPemerintah'),
                bankUmumSwasta: _.sumBy(v, 'bankUmumSwasta'),
                bankPengkreditanRakyat: _.sumBy(v, 'bankPengkreditanRakyat'),
                koperasiSimpanPinjam: _.sumBy(v, 'koperasiSimpanPinjam'),
            }))

            return dataTable
        } else {
            // tingkat kecamatan
            const data = await prisma.sE_Ekonomi_LembagaKeuangan.findMany({
                where: {
                    idProvinsi: Number(prov),
                    idKabkot: Number(kab),
                    idKecamatan: Number(kec)
                }
            })
            const dataTable = _.map(_.groupBy(data, "idKecamatan"), (v: any) => ({
                bankUmumPemerintah: _.sumBy(v, 'bankUmumPemerintah'),
                bankUmumSwasta: _.sumBy(v, 'bankUmumSwasta'),
                bankPengkreditanRakyat: _.sumBy(v, 'bankPengkreditanRakyat'),
                koperasiSimpanPinjam: _.sumBy(v, 'koperasiSimpanPinjam'),
            }))

            return dataTable
        }
    }

}