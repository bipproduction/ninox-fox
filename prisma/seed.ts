import seederDesa1 from './../src/modules/seeder/data/area_desa_1.json';
import seederDesa2 from './../src/modules/seeder/data/area_desa_2.json';
import seederDesa3 from './../src/modules/seeder/data/area_desa_3.json';
import seederKecamatan from './../src/modules/seeder/data/area_kecamatan.json';
import seederKabupaten from './../src/modules/seeder/data/area_kabkot.json';
import seederProvinsi from './../src/modules/seeder/data/area_provinsi.json';
import seederComponents from './../src/modules/seeder/data/component.json';
import seederUser from './../src/modules/seeder/data/user.json';
import seederUserAccess from './../src/modules/seeder/data/user_access.json';
import seederUserRole from './../src/modules/seeder/data/user_role.json';
import _ from 'lodash';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

; (async () => {

    // provinsi
    for (let data of seederProvinsi) {
        await prisma.areaProvinsi.upsert({
            where: {
                id: data.id
            },
            update: {
                name: data.name
            },
            create: {
                id: data.id,
                name: data.name
            },
        })
    }

    // kabupaten
    for (let data of seederKabupaten) {
        await prisma.areaKabkot.upsert({
            where: {
                id: data.id
            },
            update: {
                name: data.name
            },
            create: {
                id: data.id,
                name: data.name,
                idProvinsi: data.idProvinsi
            },
        })
    }

    // kecamatan
    const cekKecamatan = await prisma.areaKecamatan.count()
    if (cekKecamatan == 0) {
        const ins = await prisma.areaKecamatan.createMany({
            data: seederKecamatan
        })
    }

    // desa
    const cekKelurahan = await prisma.areaKelurahan.count()
    if (cekKelurahan == 0) {
        const ins = await prisma.areaKelurahan.createMany({
            data: seederDesa1
        })
        const ins2 = await prisma.areaKelurahan.createMany({
            data: seederDesa2
        })
        const ins3 = await prisma.areaKelurahan.createMany({
            data: seederDesa3
        })
    }


    // komponen
    for (let data of seederComponents) {
        await prisma.component.upsert({
            where: {
                id: data.id,
            },
            create: {
                id: data.id,
                owner: data.owner,
                menu: data.menu,
                group: data.group,
                keyMenu: data.keyMenu,
                link: data.link
            },
            update: {
                owner: data.owner,
                menu: data.menu,
                group: data.group,
                keyMenu: data.keyMenu,
                link: data.link
            }
        })
    }


    // user role
    for (let data of seederUserRole) {
        await prisma.userRole.upsert({
            where: {
                id: data.id
            },
            create: {
                id: data.id,
                name: data.name
            },
            update: {
                name: data.name
            }
        })
    }

    // akses
    let cek
    for (let data of seederUserAccess) {
        cek = await prisma.userAccess.count({
            where: {
                idUserRole: data.idUserRole,
                idComponent: data.idComponent
            }
        })

        if (cek == 0) {
            await prisma.userAccess.create({
                data: {
                    idComponent: data.idComponent,
                    idUserRole: data.idUserRole
                }
            })
        }
    }


    // user
    for (let data of seederUser) {
        await prisma.user.upsert({
            where: {
                id: data.id
            },
            create: {
                id: data.id,
                email: data.email,
                idUserRole: data.idUserRole,
                name: data.name,
                password: data.password,
                phone: data.phone,
                isAllArea: data.isAllArea
            },
            update: {
                id: data.id,
                email: data.email,
                idUserRole: data.idUserRole,
                name: data.name,
                password: data.password,
                phone: data.phone,
                isAllArea: data.isAllArea
            }
        })
    }


    // user area
    for (let data of seederUser) {
        let a = 1

        await prisma.userArea.deleteMany({
            where: {
                idUser: data.id
            }
        })

        if (data.isAllArea) {
            a = 38
        }

        for (let x = 1; x <= a; x++) {
            await prisma.userArea.create({
                data: {
                    idUser: data.id,
                    idProvinsi: Number(x),
                    isFront: (x == 1) ? true : false
                }
            })

            const kab = await prisma.areaKabkot.findMany({
                where: {
                    idProvinsi: Number(x),
                    isActive: true
                }
            })

            const wilayahTrue = kab.map((v: any) => ({
                ..._.omit(v, ["id", "idProvinsi", "name", "isActive", "createdAt", "updatedAt"]),
                idUser: data.id,
                idProvinsi: v.idProvinsi,
                idKabkot: v.id,
                isFront: false
            }));

            await prisma.userArea.createMany({
                data: wilayahTrue
            })
        }
    }


    // suara terkunci
    const cekSuara = await prisma.audience.count()
    if (cekSuara == 0) {
        const dataWilayah = await prisma.areaKelurahan.findMany({
            select: {
                id: true,
                AreaKecamatan: {
                    select: {
                        id: true,
                        AreaKabkot: {
                            select: {
                                id: true,
                                AreaProvinsi: {
                                    select: {
                                        id: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        const wilayahTrue = dataWilayah.map((v: any) => ({
            ..._.omit(v, ["id", "AreaKecamatan", "AreaKabkot", "AreaProvinsi"]),
            idKelurahan: v.id,
            idKecamatan: v.AreaKecamatan.id,
            idKabkot: v.AreaKecamatan.AreaKabkot.id,
            idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
            value: 0
        }));


        const ins = await prisma.audience.createMany({
            data: wilayahTrue
        })
    }


    // tren perhatian publik
    const cekPct = await prisma.publicConcernTrendFix.count()
    if (cekPct == 0) {
        const dataWilayah = await prisma.areaKelurahan.findMany({
            select: {
                id: true,
                AreaKecamatan: {
                    select: {
                        id: true,
                        AreaKabkot: {
                            select: {
                                id: true,
                                AreaProvinsi: {
                                    select: {
                                        id: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        const wilayahTrue = dataWilayah.map((v: any) => ({
            ..._.omit(v, ["id", "AreaKecamatan", "AreaKabkot", "AreaProvinsi"]),
            idKelurahan: v.id,
            idKecamatan: v.AreaKecamatan.id,
            idKabkot: v.AreaKecamatan.AreaKabkot.id,
            idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
            pendidikan: 0,
            infrastruktur: 0,
            layananKesehatan: 0,
            kemiskinan: 0,
            lapanganPekerjaan: 0,
            keadilanSosial: 0
        }));


        const ins = await prisma.publicConcernTrendFix.createMany({
            data: wilayahTrue
        })
    }


    // penilaian sifat pemimpin
    const cekLta = await prisma.leaderTraitAssessmentFix.count()
    if (cekLta == 0) {
        const dataWilayah = await prisma.areaKelurahan.findMany({
            select: {
                id: true,
                AreaKecamatan: {
                    select: {
                        id: true,
                        AreaKabkot: {
                            select: {
                                id: true,
                                AreaProvinsi: {
                                    select: {
                                        id: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        const wilayahTrue = dataWilayah.map((v: any) => ({
            ..._.omit(v, ["id", "AreaKecamatan", "AreaKabkot", "AreaProvinsi"]),
            idKelurahan: v.id,
            idKecamatan: v.AreaKecamatan.id,
            idKabkot: v.AreaKecamatan.AreaKabkot.id,
            idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
            pekerjaKeras: 0,
            cerdas: 0,
            jujur: 0,
            merakyat: 0,
            tegas: 0,
            berpengalamanMemimpin: 0,
            berprestasi: 0,
            latarBelakangMiliter: 0,
            agamis: 0
        }));


        const ins = await prisma.leaderTraitAssessmentFix.createMany({
            data: wilayahTrue
        })
    }


    // isu wilayah
    const cekRhi = await prisma.regionHotIssues.count()
    if (cekRhi == 0) {
        const dataProv = await prisma.areaProvinsi.findMany({
            select: {
                id: true
            }
        })

        const dataKabkot = await prisma.areaKabkot.findMany({
            select: {
                id: true,
                idProvinsi: true,
            }
        })

        const dataKecamatan = await prisma.areaKecamatan.findMany({
            select: {
                id: true,
                AreaKabkot: {
                    select: {
                        id: true,
                        AreaProvinsi: {
                            select: {
                                id: true,
                            }
                        }
                    }
                }
            }
        })


        const dataKelurahan = await prisma.areaKelurahan.findMany({
            select: {
                id: true,
                AreaKecamatan: {
                    select: {
                        id: true,
                        AreaKabkot: {
                            select: {
                                id: true,
                                AreaProvinsi: {
                                    select: {
                                        id: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })


        const wilayahTrueProv = dataProv.map((v: any) => ({
            ..._.omit(v, ["id"]),
            idProvinsi: v.id,
            description: '-'
        }));

        const wilayahTrueKabkot = dataKabkot.map((v: any) => ({
            ..._.omit(v, ["id"]),
            idKabkot: v.id,
            idProvinsi: v.idProvinsi,
            description: '-'
        }));

        const wilayahTrueKec = dataKecamatan.map((v: any) => ({
            ..._.omit(v, ["id", "AreaKabkot", "AreaProvinsi"]),
            idKecamatan: v.id,
            idKabkot: v.AreaKabkot.id,
            idProvinsi: v.AreaKabkot.AreaProvinsi.id,
            description: '-'
        }));


        const wilayahTrueKel = dataKelurahan.map((v: any) => ({
            ..._.omit(v, ["id", "AreaKecamatan", "AreaKabkot", "AreaProvinsi"]),
            idKelurahan: v.id,
            idKecamatan: v.AreaKecamatan.id,
            idKabkot: v.AreaKecamatan.AreaKabkot.id,
            idProvinsi: v.AreaKecamatan.AreaKabkot.AreaProvinsi.id,
            description: '-'
        }));


        await prisma.regionHotIssues.createMany({
            data: wilayahTrueProv
        })

        await prisma.regionHotIssues.createMany({
            data: wilayahTrueKabkot
        })

        await prisma.regionHotIssues.createMany({
            data: wilayahTrueKec
        })

        await prisma.regionHotIssues.createMany({
            data: wilayahTrueKel
        })
    }


    // data sosial ekonomi
    const area = await prisma.areaKecamatan.findMany({
        select: {
            id: true,
            AreaKabkot: {
                select: {
                    id: true,
                    AreaProvinsi: {
                        select: {
                            id: true,
                        }
                    }
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    })

    const data = area.map((v: any) => ({
        ..._.omit(v, ["id", "AreaKabkot", "AreaProvinsi"]),
        idKecamatan: v.id,
        idKabkot: v.AreaKabkot.id,
        idProvinsi: v.AreaKabkot.AreaProvinsi.id,
    }));

    // KETENAGAKERJAAN - JAMINAN KESEHATAN
    const cek1 = await prisma.sE_Ketenagakerjaan_JaminanKesehatan.count()
    if (cek1 == 0) {
        const ins = await prisma.sE_Ketenagakerjaan_JaminanKesehatan.createMany({
            data: data
        })
    }

    // KETENAGAKERJAAN - JAMINAN KECELAKAAN KERJA
    const cek2 = await prisma.sE_Ketenagakerjaan_JaminanKecelakaanKerja.count()
    if (cek2 == 0) {
        const ins = await prisma.sE_Ketenagakerjaan_JaminanKecelakaanKerja.createMany({
            data: data
        })
    }

    // KETENAGAKERJAAN - JAMINAN KEMATIAN
    const cek3 = await prisma.sE_Ketenagakerjaan_JaminanKematian.count()
    if (cek3 == 0) {
        const ins = await prisma.sE_Ketenagakerjaan_JaminanKematian.createMany({
            data: data
        })
    }

    // KETENAGAKERJAAN - JAMINAN HARI TUA
    const cek4 = await prisma.sE_Ketenagakerjaan_JaminanHariTua.count()
    if (cek4 == 0) {
        const ins = await prisma.sE_Ketenagakerjaan_JaminanHariTua.createMany({
            data: data
        })
    }

    // KETENAGAKERJAAN - JAMINAN PENSIUN
    const cek5 = await prisma.sE_Ketenagakerjaan_JaminanPensiun.count()
    if (cek5 == 0) {
        const ins = await prisma.sE_Ketenagakerjaan_JaminanPensiun.createMany({
            data: data
        })
    }

    // KETENAGAKERJAAN - PENGANGGURAN
    const cek6 = await prisma.sE_Ketenagakerjaan_Pengangguran.count()
    if (cek6 == 0) {
        const ins = await prisma.sE_Ketenagakerjaan_Pengangguran.createMany({
            data: data
        })
    }

    // TRANSPORTASI - PERMUKAAN JALAN YG TERLUAS
    const cek7 = await prisma.sE_Transportasi_PermukaanJalanYgTerluas.count()
    if (cek7 == 0) {
        const ins = await prisma.sE_Transportasi_PermukaanJalanYgTerluas.createMany({
            data: data
        })
    }

    // TRANSPORTASI - JALAN DILALUI KENDARAAN
    const cek8 = await prisma.sE_Transportasi_JalanDiLaluiKendaraan.count()
    if (cek8 == 0) {
        const ins = await prisma.sE_Transportasi_JalanDiLaluiKendaraan.createMany({
            data: data
        })
    }

    // TRANSPORTASI - KECELAKAAN
    const cek9 = await prisma.sE_Transportasi_Kecelakaan.count()
    if (cek9 == 0) {
        const ins = await prisma.sE_Transportasi_Kecelakaan.createMany({
            data: data
        })
    }

    // AGAMA - RUMAH IBADAH
    const cek10 = await prisma.sE_Agama_RumahIbadah.count()
    if (cek10 == 0) {
        const ins = await prisma.sE_Agama_RumahIbadah.createMany({
            data: data
        })
    }

    // PENDIDIKAN - JARAK FASILITAS
    const cek11 = await prisma.sE_Pendidikan_JarakFasilitas.count()
    if (cek11 == 0) {
        const ins = await prisma.sE_Pendidikan_JarakFasilitas.createMany({
            data: data
        })
    }

    // PENDIDIKAN - JALAN KAKI < 4 JAM 
    const cek12 = await prisma.sE_Pendidikan_JalanKakiKurangEmpatJam.count()
    if (cek12 == 0) {
        const ins = await prisma.sE_Pendidikan_JalanKakiKurangEmpatJam.createMany({
            data: data
        })
    }

    // PENDIDIKAN - GURU TERSERTIFIKASI
    const cek13 = await prisma.sE_Pendidikan_GuruTersertifikasi.count()
    if (cek13 == 0) {
        const ins = await prisma.sE_Pendidikan_GuruTersertifikasi.createMany({
            data: data
        })
    }

    // PENDIDIKAN - GURU HONORER
    const cek14 = await prisma.sE_Pendidikan_GuruHonorer.count()
    if (cek14 == 0) {
        const ins = await prisma.sE_Pendidikan_GuruHonorer.createMany({
            data: data
        })
    }

    // KESEHATAN - KELAS IBU HAMIL
    const cek15 = await prisma.sE_Kesehatan_KelasIbuHamil.count()
    if (cek15 == 0) {
        const ins = await prisma.sE_Kesehatan_KelasIbuHamil.createMany({
            data: data
        })
    }

    // KESEHATAN - IBU HAMIL DARI KELUARGA MISKIN
    const cek16 = await prisma.sE_Kesehatan_IbuHamilDariKeluargaMiskin.count()
    if (cek16 == 0) {
        const ins = await prisma.sE_Kesehatan_IbuHamilDariKeluargaMiskin.createMany({
            data: data
        })
    }

    // KESEHATAN - JAMINAN UNTUK BADUTA
    const cek17 = await prisma.sE_Kesehatan_JaminanUntukBaduta.count()
    if (cek17 == 0) {
        const ins = await prisma.sE_Kesehatan_JaminanUntukBaduta.createMany({
            data: data
        })
    }

    // KESEHATAN - POS PELAYANAN
    const cek18 = await prisma.sE_Kesehatan_PosPelayanan.count()
    if (cek18 == 0) {
        const ins = await prisma.sE_Kesehatan_PosPelayanan.createMany({
            data: data
        })
    }

    // KESEHATAN - FASILITAS
    const cek19 = await prisma.sE_Kesehatan_Fasilitas.count()
    if (cek19 == 0) {
        const ins = await prisma.sE_Kesehatan_Fasilitas.createMany({
            data: data
        })
    }

    // KESEHATAN - RATA RATA JARAK FASILITAS
    const cek20 = await prisma.sE_Kesehatan_RataRataJarakFasilitas.count()
    if (cek20 == 0) {
        const ins = await prisma.sE_Kesehatan_RataRataJarakFasilitas.createMany({
            data: data
        })
    }

    // KESEHATAN - JUMLAH DOKTER
    const cek21 = await prisma.sE_Kesehatan_JumlahDokter.count()
    if (cek21 == 0) {
        const ins = await prisma.sE_Kesehatan_JumlahDokter.createMany({
            data: data
        })
    }

    // KEAMANAN - PERKELAHIAN
    const cek22 = await prisma.sE_Keamanan_Perkelahian.count()
    if (cek22 == 0) {
        const ins = await prisma.sE_Keamanan_Perkelahian.createMany({
            data: data
        })
    }

    // KEAMANAN - PENCURIAN
    const cek23 = await prisma.sE_Keamanan_Pencurian.count()
    if (cek23 == 0) {
        const ins = await prisma.sE_Keamanan_Pencurian.createMany({
            data: data
        })
    }

    // KEAMANAN - PENCURIAN DAN KEKERASAN
    const cek24 = await prisma.sE_Keamanan_PencurianDanKekerasan.count()
    if (cek24 == 0) {
        const ins = await prisma.sE_Keamanan_PencurianDanKekerasan.createMany({
            data: data
        })
    }

    // KEAMANAN - PENIPUAN DAN PENGGELAPAN
    const cek25 = await prisma.sE_Keamanan_PenipuanDanPenggelapan.count()
    if (cek25 == 0) {
        const ins = await prisma.sE_Keamanan_PenipuanDanPenggelapan.createMany({
            data: data
        })
    }

    // KEAMANAN - PENGANIAYAAN
    const cek26 = await prisma.sE_Keamanan_Penganiayaan.count()
    if (cek26 == 0) {
        const ins = await prisma.sE_Keamanan_Penganiayaan.createMany({
            data: data
        })
    }

    // KEAMANAN - PERKOSAAN
    const cek27 = await prisma.sE_Keamanan_Perkosaan.count()
    if (cek27 == 0) {
        const ins = await prisma.sE_Keamanan_Perkosaan.createMany({
            data: data
        })
    }

    // KEAMANAN - NARKOBA
    const cek28 = await prisma.sE_Keamanan_Narkoba.count()
    if (cek28 == 0) {
        const ins = await prisma.sE_Keamanan_Narkoba.createMany({
            data: data
        })
    }

    // EKONOMI - JUMLAH PASAR
    const cek29 = await prisma.sE_Ekonomi_JumlahPasar.count()
    if (cek29 == 0) {
        const ins = await prisma.sE_Ekonomi_JumlahPasar.createMany({
            data: data
        })
    }

    // EKONOMI - LEMBAGA KEUANGAN
    const cek30 = await prisma.sE_Ekonomi_LembagaKeuangan.count()
    if (cek30 == 0) {
        const ins = await prisma.sE_Ekonomi_LembagaKeuangan.createMany({
            data: data
        })
    }

    // PERTANIAN - JENIS PRASARANA TRANSPORTASI
    const cek31 = await prisma.sE_Pertanian_JenisPrasaranaTransportasi.count()
    if (cek31 == 0) {
        const ins = await prisma.sE_Pertanian_JenisPrasaranaTransportasi.createMany({
            data: data
        })
    }

    // PERTANIAN - IRIGASI
    const cek32 = await prisma.sE_Pertanian_Irigasi.count()
    if (cek32 == 0) {
        const ins = await prisma.sE_Pertanian_Irigasi.createMany({
            data: data
        })
    }

    // KEMISKINAN - DATA
    const cek33 = await prisma.sE_Kemiskinan_Data.count()
    if (cek33 == 0) {
        const ins = await prisma.sE_Kemiskinan_Data.createMany({
            data: data
        })
    }

    // KEMISKINAN - BPJS
    const cek34 = await prisma.sE_Kemiskinan_BPJS.count()
    if (cek34 == 0) {
        const ins = await prisma.sE_Kemiskinan_BPJS.createMany({
            data: data
        })
    }



})().then(() => {
    console.log("done")
    process.exit(0)
})
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })