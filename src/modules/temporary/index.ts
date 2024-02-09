import funDownloadJumlahPasar from "./ekonomi/back/fun/download_jumlah_pasar";
import funDownloadLembagaKeuangan from "./ekonomi/back/fun/download_lembaga_keuangan";
import funGetJumlahPasar from "./ekonomi/back/fun/get_jumlah_pasar";
import funGetLembagaKeuangan from "./ekonomi/back/fun/get_lembaga_keuangan";
import ViewUploadJumlahPasar from "./ekonomi/back/view/upload_jumlah_pasar";
import ViewUploadLembagaKeuangan from "./ekonomi/back/view/upload_lembaga_keuangan";
import ViewJumlahPasar from "./ekonomi/back/view/view_jumlah_pasar";
import ViewLembagaKeuangan from "./ekonomi/back/view/view_lembaga_keuangan";
import ChartBangunanPermanen from "./ekonomi/front/components/chart_bangunan_permanen";
import ViewEkonomi from "./ekonomi/front/view/view_ekonomi";
import ViewLayoutTmp from "./global_layout/view/view_layout_tmp";
import funDownloadJalanDilaluiKendaraan from "./infrastruktur_and_transportasi/back/fun/download_jalan_dilalui_kendaraan";
import funDownloadKecelakaan from "./infrastruktur_and_transportasi/back/fun/download_kecelakaan";
import funDownloadPermukaanJalan from "./infrastruktur_and_transportasi/back/fun/download_permukaan_jalan";
import funGetJalanDilaluiKendaraan from "./infrastruktur_and_transportasi/back/fun/get_jalan_dilalui_kendaraan";
import funGetKecelakaan from "./infrastruktur_and_transportasi/back/fun/get_kecelakaan";
import funGetPermukaanJalan from "./infrastruktur_and_transportasi/back/fun/get_permukaan_jalan";
import ViewUploadJalanDilaluiKendaraan from "./infrastruktur_and_transportasi/back/view/upload_jalan_dilalui_kendaraan";
import ViewUploadKecelakaan from "./infrastruktur_and_transportasi/back/view/upload_kecelakaan";
import ViewUploadPermukaanJalan from "./infrastruktur_and_transportasi/back/view/upload_permukaan_jalan";
import ViewJalanDilaluiKendaraan from "./infrastruktur_and_transportasi/back/view/view_jalan_dilalui_kendaraan";
import ViewKecelakaan from "./infrastruktur_and_transportasi/back/view/view_kecelakaan";
import ViewPermukaanJalan from "./infrastruktur_and_transportasi/back/view/view_permukaan_jalan";
import funGetFrontJalanDilaluiKendaraan from "./infrastruktur_and_transportasi/front/fun/get_jalan_dilalui_kendaraan";
import funGetFrontKecelakaan from "./infrastruktur_and_transportasi/front/fun/get_kecelakaan";
import funGetFrontPermukaanJalan from "./infrastruktur_and_transportasi/front/fun/get_permukaan_jalan";
import ViewInfrastrukturAndTransportasi from "./infrastruktur_and_transportasi/front/view/view_infrastruktur_and_transportasi";
import funDownloadNarkoba from "./kamtibmas/back/fun/download_narkoba";
import funDownloadPencurian from "./kamtibmas/back/fun/download_pencurian";
import funDownloadPencurianDanKekerasan from "./kamtibmas/back/fun/download_pencurian_dan_kekerasan";
import funDownloadPenganiayaan from "./kamtibmas/back/fun/download_penganiayaan";
import funDownloadPenipuanDanPenggelapan from "./kamtibmas/back/fun/download_penipuan_dan_penggelapan";
import funDownloadPerkelahian from "./kamtibmas/back/fun/download_perkelahian";
import funDownloadPerkosaan from "./kamtibmas/back/fun/download_perkosaan";
import funGetNarkoba from "./kamtibmas/back/fun/get_narkoba";
import funGetPencurian from "./kamtibmas/back/fun/get_pencurian";
import funGetPencurianDanKekerasan from "./kamtibmas/back/fun/get_pencurian_dan_kekerasan";
import funGetPenganiayaan from "./kamtibmas/back/fun/get_penganiayaan";
import funGetPenipuanDanPenggelapan from "./kamtibmas/back/fun/get_penipuan_dan_penggelapan";
import funGetPerkelahian from "./kamtibmas/back/fun/get_perkelahian";
import funGetPerkosaan from "./kamtibmas/back/fun/get_perkosaan";
import ViewUploadNarkoba from "./kamtibmas/back/view/upload_narkoba";
import ViewUploadPencurian from "./kamtibmas/back/view/upload_pencurian";
import ViewUploadPencurianDanKekerasan from "./kamtibmas/back/view/upload_pencurian_dan_kekerasan";
import ViewUploadPenganiayaan from "./kamtibmas/back/view/upload_penganiayaan";
import ViewUploadPenipuanDanPenggelapan from "./kamtibmas/back/view/upload_penipuan_dan_penggelapan";
import ViewUploadPerkelahian from "./kamtibmas/back/view/upload_perkelahian";
import ViewUploadPerkosaan from "./kamtibmas/back/view/upload_perkosaan";
import ViewNarkoba from "./kamtibmas/back/view/view_narkoba";
import ViewPencurian from "./kamtibmas/back/view/view_pencurian";
import ViewPencurianDanKekerasan from "./kamtibmas/back/view/view_pencurian_dan_kekerasan";
import ViewPenganiayaan from "./kamtibmas/back/view/view_penganiayaan";
import ViewPenipuanDanPenggelapan from "./kamtibmas/back/view/view_penipuan_dan_penggelapan";
import ViewPerkelahian from "./kamtibmas/back/view/view_perkelahian";
import ViewPerkosaan from "./kamtibmas/back/view/view_perkosaan";
import ViewKamtibmas from "./kamtibmas/front/view/view_kamtibmas";
import funDownloadRumahIbadah from "./keagamaan/back/fun/download_rumah_ibadah";
import funGetRumahIbadah from "./keagamaan/back/fun/get_rumah_ibadah";
import ViewUploadRumahIbadah from "./keagamaan/back/view/upload_rumah_ibadah";
import ViewRumahIbadah from "./keagamaan/back/view/view_rumah_ibadah";
import funGetFrontRumahIbadah from "./keagamaan/front/fun/get_rumah_ibadah";
import ViewKeagamaan from "./keagamaan/front/view/view_keagamaan";
import funDownloadBpjs from "./kemiskinan_dan_ketimpangan/back/fun/download_bpjs";
import funDownloadDataKemiskinan from "./kemiskinan_dan_ketimpangan/back/fun/download_data_kemiskinan";
import funGetBpjs from "./kemiskinan_dan_ketimpangan/back/fun/get_bpjs";
import funGetDataKemiskinan from "./kemiskinan_dan_ketimpangan/back/fun/get_data_kemiskinan";
import ViewUploadBpjs from "./kemiskinan_dan_ketimpangan/back/view/upload_bpjs";
import ViewUploadDataKemiskinan from "./kemiskinan_dan_ketimpangan/back/view/upload_data_kemiskinan";
import ViewBpjs from "./kemiskinan_dan_ketimpangan/back/view/view_bpjs";
import ViewDataKemiskinan from "./kemiskinan_dan_ketimpangan/back/view/view_data_kemiskinan";
import ViewKemiskinanDanKetimpangan from "./kemiskinan_dan_ketimpangan/front/view/view_kemiskinan_dan_ketimpangan";
import funDownloadFasilitas from "./kesehatan/back/fun/download_fasilitas";
import funDownloadIbuHamilDariKeluargaMiskin from "./kesehatan/back/fun/download_ibu_hamil_dari_keluarga_miskin";
import funDownloadJaminanUntukBaduta from "./kesehatan/back/fun/download_jaminan_untuk_baduta";
import funDownloadJumlahDokter from "./kesehatan/back/fun/download_jumlah_dokter";
import funDownloadKelasIbuHamil from "./kesehatan/back/fun/download_kelas_ibu_hamil";
import funDownloadPosPelayanan from "./kesehatan/back/fun/download_pos_pelayanan";
import funDownloadRataRataJarakFasilitas from "./kesehatan/back/fun/download_rata_rata_jarak_fasilitas";
import funGetFasilitas from "./kesehatan/back/fun/get_fasilitas";
import funGetIbuHamilDariKeluargaMiskin from "./kesehatan/back/fun/get_ibu_hamil_dari_keluarga_miskin";
import funGetJaminanUntukBaduta from "./kesehatan/back/fun/get_jaminan_untuk_baduta";
import funGetJumlahDokter from "./kesehatan/back/fun/get_jumlah_dokter";
import funGetKelasIbuHamil from "./kesehatan/back/fun/get_kelas_ibu_hamil";
import funGetPosPelayanan from "./kesehatan/back/fun/get_pos_pelayanan";
import funGetRataRataJarakFasilitas from "./kesehatan/back/fun/get_rata_rata_jarak_fasilitas";
import ViewUploadFasilitas from "./kesehatan/back/view/upload_fasilitas";
import ViewUploadIbuHamilDariKeluargaMiskin from "./kesehatan/back/view/upload_ibu_hamil_dari_keluarga_miskin";
import ViewUploadJaminanUntukBaduta from "./kesehatan/back/view/upload_jaminan_untuk_baduta";
import ViewUploadJumlahDokter from "./kesehatan/back/view/upload_jumlah_dokter";
import ViewUploadKelasIbuHamil from "./kesehatan/back/view/upload_kelas_ibu_hamil";
import ViewUploadPosPelayanan from "./kesehatan/back/view/upload_pos_pelayanan";
import ViewUploadRataRataJarakFasilitas from "./kesehatan/back/view/upload_rata_rata_jarak_fasilitas";
import ViewFasilitas from "./kesehatan/back/view/view_fasilitas";
import ViewIbuHamilDariKeluargaMiskin from "./kesehatan/back/view/view_ibu_hamil_dari_kaluarga_miskin";
import ViewJaminanUntukBaduta from "./kesehatan/back/view/view_jaminan_untuk_baduta";
import ViewJumlahDokter from "./kesehatan/back/view/view_jumlah_dokter";
import ViewKelasIbuHamil from "./kesehatan/back/view/view_kelas_ibu_hamil";
import ViewPosPelayanan from "./kesehatan/back/view/view_pos_pelayanan";
import ViewRataRataJarakFasilitas from "./kesehatan/back/view/view_rata_rata_jarak_fasilitas";
import funGetFrontFasilitas from "./kesehatan/front/fun/get_fasilitas";
import funGetFrontIbuHamilDariKeluargaMiskin from "./kesehatan/front/fun/get_ibu_hamil_dari_keluarga_miskin";
import funGetFrontJaminanUntukBaduta from "./kesehatan/front/fun/get_jaminan_untuk_baduta";
import funGetFrontJumlahDokter from "./kesehatan/front/fun/get_jumlah_dokter";
import funGetFrontKelasIbuHamil from "./kesehatan/front/fun/get_kelas_ibu_hamil";
import funGetFrontPosPelayanan from "./kesehatan/front/fun/get_pos_pelayanan";
import funGetFrontRataRataJarakFasilitas from "./kesehatan/front/fun/get_rata_rata_jarak_fasilitas";
import ViewKesehatan from "./kesehatan/front/view/view_kesehatan";
import funDownloadJaminanHariTua from "./ketenagakerjaan/back/fun/download_jaminan_hari_tua";
import funDownloadJaminanKecelakaanKerja from "./ketenagakerjaan/back/fun/download_jaminan_kecelakaan_kerja";
import funDownloadJaminanKematian from "./ketenagakerjaan/back/fun/download_jaminan_kematian";
import funDownloadJaminanKesehatan from "./ketenagakerjaan/back/fun/download_jaminan_kesehatan";
import funDownloadJaminanPensiun from "./ketenagakerjaan/back/fun/download_jaminan_pensiun";
import funDownloadPengangguran from "./ketenagakerjaan/back/fun/download_pengangguran";
import funGetJaminanHariTua from "./ketenagakerjaan/back/fun/get_jaminan_hari_tua";
import funGetJaminanKecelakaanKerja from "./ketenagakerjaan/back/fun/get_jaminan_kecelakaan_kerja";
import funGetJaminanKematian from "./ketenagakerjaan/back/fun/get_jaminan_kematian";
import funGetJaminanKesehatan from "./ketenagakerjaan/back/fun/get_jaminan_kesehatan";
import funGetJaminanPensiun from "./ketenagakerjaan/back/fun/get_jaminan_pensiun";
import funGetPengangguran from "./ketenagakerjaan/back/fun/get_pengangguran";
import ViewUploadJaminanHariTua from "./ketenagakerjaan/back/view/upload_jaminan_hari_tua";
import ViewUploadJaminanKecelakaanKerja from "./ketenagakerjaan/back/view/upload_jaminan_kecelakaan_kerja";
import ViewUploadJaminanKematian from "./ketenagakerjaan/back/view/upload_jaminan_kematian";
import ViewUploadJaminanKesehatan from "./ketenagakerjaan/back/view/upload_jaminan_kesehatan";
import ViewUploadJaminanPensiun from "./ketenagakerjaan/back/view/upload_jaminan_pensiun";
import ViewUploadPengangguran from "./ketenagakerjaan/back/view/upload_pengangguran";
import ViewJaminanHariTua from "./ketenagakerjaan/back/view/view_jaminan_hari_tua";
import ViewJaminanKecelakaanKerja from "./ketenagakerjaan/back/view/view_jaminan_kecelakaan_kerja";
import ViewJaminanKematian from "./ketenagakerjaan/back/view/view_jaminan_kematian";
import ViewJaminanKesehatan from "./ketenagakerjaan/back/view/view_jaminan_kesehatan";
import ViewJaminanPensiun from "./ketenagakerjaan/back/view/view_jaminan_pensiun";
import ViewPengangguran from "./ketenagakerjaan/back/view/view_pengangguran";
import funGetFrontJaminanHariTua from "./ketenagakerjaan/front/fun/get_jaminan_hari_tua";
import funGetFrontJaminanKecelakaanKerja from "./ketenagakerjaan/front/fun/get_jaminan_kecelakaan_kerja";
import funGetFrontJaminanKematian from "./ketenagakerjaan/front/fun/get_jaminan_kematian";
import funGetFrontJaminanKesehatan from "./ketenagakerjaan/front/fun/get_jaminan_kesehatan";
import funGetFrontJaminanPensiun from "./ketenagakerjaan/front/fun/get_jaminan_pensiun";
import funGetFrontPengangguran from "./ketenagakerjaan/front/fun/get_pengangguran";
import ViewKetenagakerjaan from "./ketenagakerjaan/front/view/view_ketenagakerjaan";
import funDownloadGuruHonorer from "./pendidikan/back/fun/download_guru_honorer";
import funDownloadGuruTersertifikasi from "./pendidikan/back/fun/download_guru_tersertifikasi";
import funDownloadJalanKakiKurang4Jam from "./pendidikan/back/fun/download_jalan_kaki_kurang_4_jam";
import funDownloadJarakFasilitas from "./pendidikan/back/fun/download_jarak_fasilitas";
import funGetGuruHonorer from "./pendidikan/back/fun/get_guru_honorer";
import funGetGuruTersertifikasi from "./pendidikan/back/fun/get_guru_tersertifikasi";
import funGetJalanKakiKurang4Jam from "./pendidikan/back/fun/get_jalan_kaki_kurang_4_jam";
import funGetJarakFasilitas from "./pendidikan/back/fun/get_jarak_fasilitas";
import ViewUploadGuruHonorer from "./pendidikan/back/view/upload_guru_honorer";
import ViewUploadGuruTersertifikasi from "./pendidikan/back/view/upload_guru_tersertifikasi";
import ViewUploadJalanKakiKurang4Jam from "./pendidikan/back/view/upload_jalan_kaki_kurang_4_jam";
import ViewUploadJarakFasilitas from "./pendidikan/back/view/upload_jarak_fasilitas";
import ViewGuruHonorer from "./pendidikan/back/view/view_guru_honorer";
import ViewGuruTersertifikasi from "./pendidikan/back/view/view_guru_tersertifikasi";
import ViewJalanKakiKurang4Jam from "./pendidikan/back/view/view_jalan_kaki_kurang_4_jam";
import ViewJarakFasilitas from "./pendidikan/back/view/view_jarak_fasilitas";
import funGetFrontGuruHonorer from "./pendidikan/front/fun/get_guru_honorer";
import funGetFrontGuruTersertifikasi from "./pendidikan/front/fun/get_guru_tersertifikasi";
import funGetFrontJalanKakiKurang4Jam from "./pendidikan/front/fun/get_jalan_kaki_kurang_4_jam";
import funGetFrontJarakFasilitas from "./pendidikan/front/fun/get_jarak_fasilitas";
import ViewPendidikan from "./pendidikan/front/view/view_pendidikan";
import funDownloadIrigasi from "./pertanian/back/fun/download_irigasi";
import funDownloadJenisPrasarana from "./pertanian/back/fun/download_jenis_prasarana";
import funGetIrigasi from "./pertanian/back/fun/get_irigasi";
import funGetJenisPrasarana from "./pertanian/back/fun/get_jenis_prasarana";
import ViewUploadIrigasi from "./pertanian/back/view/upload_irigasi";
import ViewUploadJenisPrasaranaTransportasi from "./pertanian/back/view/upload_jenis_prasarana";
import ViewIrigasi from "./pertanian/back/view/view_irigasi";
import ViewJenisPrasarana from "./pertanian/back/view/view_jenis_prasarana";
import ViewPertanian from "./pertanian/front/view/view_pertanian";

export { ViewLayoutTmp }
export { ViewKetenagakerjaan }
export { ViewInfrastrukturAndTransportasi }
export { ViewKeagamaan }
export { ViewPendidikan }
export { ViewKesehatan }
export { ViewKamtibmas }
export { ViewEkonomi }
export { ViewPertanian }
export { ViewKemiskinanDanKetimpangan }
export { ChartBangunanPermanen }
export { ViewJaminanKesehatan }
export { ViewJaminanKecelakaanKerja }
export { ViewJaminanKematian }
export { ViewJaminanHariTua }
export { ViewJaminanPensiun }
export { ViewPengangguran }
export { funDownloadJaminanKesehatan }
export { funGetJaminanKesehatan }
export { funDownloadJaminanKecelakaanKerja }
export { funGetJaminanKecelakaanKerja }
export { funGetJaminanKematian }
export { funDownloadJaminanKematian }
export { funGetJaminanHariTua }
export { funDownloadJaminanHariTua }
export { funGetJaminanPensiun }
export { funDownloadJaminanPensiun }
export { funGetPengangguran }
export { funDownloadPengangguran }
export { funGetPermukaanJalan }
export { funDownloadPermukaanJalan }
export { ViewPermukaanJalan }
export { funDownloadJalanDilaluiKendaraan }
export { funGetJalanDilaluiKendaraan }
export { ViewJalanDilaluiKendaraan }
export { funDownloadKecelakaan }
export { funGetKecelakaan }
export { ViewKecelakaan }
export { funGetRumahIbadah }
export { funDownloadRumahIbadah }
export { ViewRumahIbadah }
export { ViewJarakFasilitas }
export { funDownloadJarakFasilitas }
export { funGetJarakFasilitas }
export { ViewJalanKakiKurang4Jam }
export { funGetJalanKakiKurang4Jam }
export { funDownloadJalanKakiKurang4Jam }
export { ViewGuruTersertifikasi }
export { funGetGuruTersertifikasi }
export { funDownloadGuruTersertifikasi }
export { ViewGuruHonorer }
export { funDownloadGuruHonorer }
export { funGetGuruHonorer }
export { ViewKelasIbuHamil }
export { funDownloadKelasIbuHamil }
export { funGetKelasIbuHamil }
export { ViewIbuHamilDariKeluargaMiskin }
export { funDownloadIbuHamilDariKeluargaMiskin }
export { funGetIbuHamilDariKeluargaMiskin }
export { ViewJaminanUntukBaduta }
export { funDownloadJaminanUntukBaduta }
export { funGetJaminanUntukBaduta }
export { ViewPosPelayanan }
export { funDownloadPosPelayanan }
export { funGetPosPelayanan }
export { ViewFasilitas }
export { funDownloadFasilitas }
export { funGetFasilitas }
export { ViewRataRataJarakFasilitas }
export { funDownloadRataRataJarakFasilitas }
export { funGetRataRataJarakFasilitas }
export { ViewJumlahDokter }
export { funDownloadJumlahDokter }
export { funGetJumlahDokter }
export { ViewPerkelahian }
export { funDownloadPerkelahian }
export { funGetPerkelahian }
export { ViewPencurian }
export { funDownloadPencurian }
export { funGetPencurian }
export { ViewPencurianDanKekerasan }
export { funDownloadPencurianDanKekerasan }
export { funGetPencurianDanKekerasan }
export { ViewPenipuanDanPenggelapan }
export { funDownloadPenipuanDanPenggelapan }
export { funGetPenipuanDanPenggelapan }
export { ViewPenganiayaan }
export { funDownloadPenganiayaan }
export { funGetPenganiayaan }
export { ViewPerkosaan }
export { funDownloadPerkosaan }
export { funGetPerkosaan }
export { ViewNarkoba }
export { funDownloadNarkoba }
export { funGetNarkoba }
export { ViewJumlahPasar }
export { funDownloadJumlahPasar }
export { funGetJumlahPasar }
export { ViewLembagaKeuangan }
export { funDownloadLembagaKeuangan }
export { funGetLembagaKeuangan }
export { ViewJenisPrasarana }
export { funDownloadJenisPrasarana }
export { funGetJenisPrasarana }
export { ViewIrigasi }
export { funDownloadIrigasi }
export { funGetIrigasi }
export { ViewDataKemiskinan }
export { funDownloadDataKemiskinan }
export { funGetDataKemiskinan }
export { ViewBpjs }
export { funDownloadBpjs }
export { funGetBpjs }
export { ViewUploadJaminanKesehatan }
export { ViewUploadJaminanKecelakaanKerja }
export { ViewUploadJaminanKematian }
export { ViewUploadJaminanHariTua }
export { ViewUploadJaminanPensiun }
export { ViewUploadPengangguran }
export { ViewUploadPermukaanJalan }
export { ViewUploadJalanDilaluiKendaraan }
export { ViewUploadKecelakaan }
export { ViewUploadRumahIbadah }
export { ViewUploadJarakFasilitas }
export { ViewUploadJalanKakiKurang4Jam }
export { ViewUploadGuruTersertifikasi }
export { ViewUploadGuruHonorer }
export { ViewUploadKelasIbuHamil }
export { ViewUploadIbuHamilDariKeluargaMiskin }
export { ViewUploadJaminanUntukBaduta }
export { ViewUploadPosPelayanan }
export { ViewUploadFasilitas }
export { ViewUploadRataRataJarakFasilitas }
export { ViewUploadJumlahDokter }
export { ViewUploadPerkelahian }
export { ViewUploadPencurian }
export { ViewUploadPencurianDanKekerasan }
export { ViewUploadPenipuanDanPenggelapan }
export { ViewUploadPenganiayaan }
export { ViewUploadPerkosaan }
export { ViewUploadNarkoba }
export { ViewUploadJumlahPasar }
export { ViewUploadLembagaKeuangan }
export { ViewUploadJenisPrasaranaTransportasi }
export { ViewUploadIrigasi }
export { ViewUploadDataKemiskinan }
export { ViewUploadBpjs }
export { funGetFrontJaminanKesehatan }
export { funGetFrontJaminanKecelakaanKerja }
export { funGetFrontJaminanKematian }
export { funGetFrontJaminanHariTua }
export { funGetFrontJaminanPensiun }
export { funGetFrontPengangguran }
export { funGetFrontPermukaanJalan }
export { funGetFrontJalanDilaluiKendaraan }
export { funGetFrontKecelakaan }
export { funGetFrontRumahIbadah }
export { funGetFrontJarakFasilitas }
export { funGetFrontJalanKakiKurang4Jam }
export { funGetFrontGuruTersertifikasi }
export { funGetFrontGuruHonorer }
export { funGetFrontKelasIbuHamil }
export { funGetFrontIbuHamilDariKeluargaMiskin }
export { funGetFrontJaminanUntukBaduta }
export { funGetFrontPosPelayanan }
export { funGetFrontFasilitas }
export { funGetFrontRataRataJarakFasilitas }
export { funGetFrontJumlahDokter }