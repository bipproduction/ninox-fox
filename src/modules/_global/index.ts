import { isModalBeranda } from './val/isModalBeranda';
import { COLOR_EMOTION, COLOR_PCT } from './fun/COLOR_EMOTION';
import { LayoutViewFront } from '@/modules/_global/front';
import { LayoutView, funGetAccessAdmin } from "./back";
import { ButtonBack } from "./back";
import ModalLogout from "./back/component/modal_logout";
import PageSubTitle from "./front/components/PageSubtitle";
import ModalLogoutUser from "./front/components/modal_logout_user";
import { candateTingkat } from "./fun/fun_candidate_tingkat";
import { kabupatenCount } from "./fun/fun_kabupaten_count";
import { kecamatanCount } from "./fun/fun_kecamatan_count";
import { kelurahanCount } from "./fun/fun_kelurahan_count";
import { provinsiCount } from "./fun/fun_provinsi_count";
import { MasterKabGetByProvince } from "./fun/master_kabupaten_get_by_province";
import { MasterKecGetByKab } from "./fun/master_kecamatan_get_by_kabupaten";
import { MasterProvinceGetAll } from "./fun/master_province_get_all";
import Home from "./home/home";
import { MasterDesaGetByKec } from './fun/master_desa_get_by_kecamatan';
import { WARNA } from './fun/WARNA';
import ModalBeranda from './home/components/modal_beranda';
import funGetAccessArea from './back/fun/get_access_area';
import funGetAreaDefault from './home/fan/get_area_default';
import funGetAreaKabKotByProvinsi from './home/fan/get_area_kabkot_by_provinsi';
import funGetUserAreaProvinsi from './home/fan/get_area_provinsi';


export { provinsiCount }
export { MasterProvinceGetAll }
export { MasterKabGetByProvince }
export { LayoutView }
export { ButtonBack }
export { MasterKecGetByKab }
export { candateTingkat }
export { kabupatenCount }
export { kecamatanCount }
export { kelurahanCount }
export { Home }
export { funGetAccessAdmin }
export { ModalLogout }
export { ModalLogoutUser }
export { PageSubTitle }
export { LayoutViewFront }
export { COLOR_EMOTION }
export { MasterDesaGetByKec }
export { WARNA }
export { ModalBeranda }
export { funGetAccessArea }
export { funGetAreaDefault }
export { funGetAreaKabKotByProvinsi }
export { funGetUserAreaProvinsi }
export { COLOR_PCT }
