import ChartBangunanPermanen from "./ekonomi/components/chart_bangunan_permanen";
import ViewEkonomi from "./ekonomi/view/view_ekonomi";
import ViewLayoutTmp from "./global_layout/view/view_layout_tmp";
import funDownloadJalanDilaluiKendaraan from "./infrastruktur_and_transportasi/back/fun/download_jalan_dilalui_kendaraan";
import funDownloadKecelakaan from "./infrastruktur_and_transportasi/back/fun/download_kecelakaan";
import funDownloadPermukaanJalan from "./infrastruktur_and_transportasi/back/fun/download_permukaan_jalan";
import funGetJalanDilaluiKendaraan from "./infrastruktur_and_transportasi/back/fun/get_jalan_dilalui_kendaraan";
import funGetKecelakaan from "./infrastruktur_and_transportasi/back/fun/get_kecelakaan";
import funGetPermukaanJalan from "./infrastruktur_and_transportasi/back/fun/get_permukaan_jalan";
import ViewJalanDilaluiKendaraan from "./infrastruktur_and_transportasi/back/view/view_jalan_dilalui_kendaraan";
import ViewKecelakaan from "./infrastruktur_and_transportasi/back/view/view_kecelakaan";
import ViewPermukaanJalan from "./infrastruktur_and_transportasi/back/view/view_permukaan_jalan";
import ViewInfrastrukturAndTransportasi from "./infrastruktur_and_transportasi/front/view/view_infrastruktur_and_transportasi";
import ViewKamtibmas from "./kamtibmas/view/view_kamtibmas";
import funDownloadRumahIbadah from "./keagamaan/back/fun/download_rumah_ibadah";
import funGetRumahIbadah from "./keagamaan/back/fun/get_rumah_ibadah";
import ViewRumahIbadah from "./keagamaan/back/view/view_rumah_ibadah";
import ViewKeagamaan from "./keagamaan/front/view/view_keagamaan";
import ViewKemiskinanDanKetimpangan from "./kemiskinan_dan_ketimpangan/view/view_kemiskinan_dan_ketimpangan";
import ViewKesehatan from "./kesehatan/view/view_kesehatan";
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
import ViewJaminanHariTua from "./ketenagakerjaan/back/view/view_jaminan_hari_tua";
import ViewJaminanKecelakaanKerja from "./ketenagakerjaan/back/view/view_jaminan_kecelakaan_kerja";
import ViewJaminanKematian from "./ketenagakerjaan/back/view/view_jaminan_kematian";
import ViewJaminanKesehatan from "./ketenagakerjaan/back/view/view_jaminan_kesehatan";
import ViewJaminanPensiun from "./ketenagakerjaan/back/view/view_jaminan_pensiun";
import ViewPengangguran from "./ketenagakerjaan/back/view/view_pengangguran";
import ViewKetenagakerjaan from "./ketenagakerjaan/front/view/view_ketenagakerjaan";
import funDownloadGuruTersertifikasi from "./pendidikan/back/fun/download_guru_tersertifikasi";
import funDownloadJalanKakiKurang4Jam from "./pendidikan/back/fun/download_jalan_kaki_kurang_4_jam";
import funDownloadJarakFasilitas from "./pendidikan/back/fun/download_jarak_fasilitas";
import funGetGuruTersertifikasi from "./pendidikan/back/fun/get_guru_tersertifikasi";
import funGetJalanKakiKurang4Jam from "./pendidikan/back/fun/get_jalan_kaki_kurang_4_jam";
import funGetJarakFasilitas from "./pendidikan/back/fun/get_jarak_fasilitas";
import ViewGuruTersertifikasi from "./pendidikan/back/view/view_guru_tersertifikasi";
import ViewJalanKakiKurang4Jam from "./pendidikan/back/view/view_jalan_kaki_kurang_4_jam";
import ViewJarakFasilitas from "./pendidikan/back/view/view_jarak_fasilitas";
import ViewPendidikan from "./pendidikan/front/view/view_pendidikan";
import ViewPertanian from "./pertanian/view/view_pertanian";

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