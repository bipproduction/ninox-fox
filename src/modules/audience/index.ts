import { ViewUploadAudience } from '@/modules/audience/back';
import { ViewAudience, funDownloadAudience, funGetAudienceByArea, ViewGenerateAudience, ModalGenerateAudience, funGenerateDataAudience, funCekAudienceBatch } from "./back";
import ModalUploadAudience from './back/components/modal_upload_audience';
import TableDataAudience from './back/components/table_data_audience';
import funUploadAudience from './back/fun/upload_audience';
import funGetAudienceFront from './front/fun/get_audience_front';
import funGetAudienceDetailFront from './front/fun/get_audience_detail_front';

export { ViewAudience }
export { funGetAudienceByArea }
export { funDownloadAudience }
export { ViewUploadAudience }
export { ModalUploadAudience }
export { TableDataAudience }
export { funUploadAudience }
export { funGetAudienceFront }
export { funGetAudienceDetailFront }
export { ViewGenerateAudience }
export { ModalGenerateAudience }
export { funGenerateDataAudience }
export { funCekAudienceBatch }
