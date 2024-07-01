import { ViewUploadPairing } from '@/modules/pairing/back';
import { funDownloadPairing } from '@/modules/pairing/back';
import { funGetPairingByCanAndDate } from '@/modules/pairing/back';
import { ViewPairingFront } from '@/modules/pairing/front';
import { ViewPairing } from "./back";
import { ViewCopyDataPairing } from "./back";
import TableDataPairing from './back/components/table_data_pairing';
import ModalCopy from './back/components/modal/copy_data_modal';
import ModalUploadPairing from './back/components/modal/upload_modal';
import funCekPairing from './back/fun/cek_pairing';
import funCopyPairing from './back/fun/copy_pairing';
import funUploadPairing from './back/fun/upload_pairing';
import EchartPairingSentiment from './front/components/echart_pairing_sentiment';
import funGetPairingCandidateSummary from './front/fun/get_pairing_candidate_sum';
import funGetPairingChartSummary from './front/fun/get_pairing_chart_sum';
import funGetPairingRegional from './front/fun/get_pairing_regional';
import funGetPairingRegionalNew from './front/fun/get_pairing_regional_new';

export { ViewPairing }
export { ViewCopyDataPairing }
export { ViewPairingFront }
export { funGetPairingByCanAndDate }
export { funDownloadPairing }
export { ViewUploadPairing }
export { TableDataPairing }
export { ModalCopy }
export { ModalUploadPairing }
export { funCekPairing }
export { funCopyPairing }
export { funUploadPairing }
export { EchartPairingSentiment }
export { funGetPairingCandidateSummary }
export { funGetPairingChartSummary }
export { funGetPairingRegional }
export { funGetPairingRegionalNew }