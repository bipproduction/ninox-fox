import { MasterKabGetByProvince, MasterProvinceGetAll } from "@/modules/_global";
import { funGetCandidateActiveByArea, funGetUserDefaultFront } from "@/modules/candidate";
import { ViewBackEmotion, funDownloadEmotion, funGetEmotionByCandidateAreaDate } from "@/modules/emotion";
import _ from "lodash";
import moment from "moment";

export default async function Page({ searchParams }: { searchParams: { prov: any, city: any, can: any, date: any } }) {
  const defaultValue = await funGetUserDefaultFront()
  const kabVal = (_.isNull(defaultValue.idKabkot) || _.isUndefined(defaultValue.idKabkot)) ? 0 : defaultValue.idKabkot
  const today = moment(new Date()).format('YYYY-MM-DD')
  // const findData = {
  //   idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
  //   idKabkot: (_.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
  //   tingkat: (_.isNaN(Number(searchParams.city)) ? 1 : 2),
  //   idCandidate: (_.isUndefined(searchParams.can) ? 0 : searchParams.can),
  //   date: (_.isUndefined(searchParams.date) ? null : searchParams.date)
  // }
  const findData = {
    idProvinsi: (_.isNaN(Number(searchParams.prov)) ? defaultValue.idProvinsi : Number(searchParams.prov)),
    idKabkot: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? kabVal : _.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
    tingkat: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? defaultValue.tingkat : _.isNaN(Number(searchParams.city)) ? 1 : 2),
    idCandidate: (_.isUndefined(searchParams.can) ? defaultValue.idCandidate : searchParams.can),
    date: (_.isUndefined(searchParams.date) ? today : searchParams.date)
  }


  const prov = await MasterProvinceGetAll()
  const city = await MasterKabGetByProvince({ idProvinsi: findData.idProvinsi })
  const candidate = await funGetCandidateActiveByArea({ find: findData })
  const dataDB = await funGetEmotionByCandidateAreaDate({ find: findData })
  const dataDownload = await funDownloadEmotion({ request: findData })

  return <ViewBackEmotion param={findData} provinsi={prov} kabupaten={city} candidate={candidate} datatable={dataDB} datadownload={dataDownload} />;
}