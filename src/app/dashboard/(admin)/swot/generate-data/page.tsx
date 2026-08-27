import { MasterKabGetByProvince, MasterProvinceGetAll } from "@/modules/_global";
import { funGetCandidateActiveByArea, funGetUserDefaultFront } from "@/modules/candidate";
import { ViewGenerateSwot } from "@/modules/swot";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { prov: any, city: any } }) {
   const defaultValue = await funGetUserDefaultFront()
   const kabVal = (_.isNull(defaultValue.idKabkot) || _.isUndefined(defaultValue.idKabkot)) ? 0 : defaultValue.idKabkot
   const findData = {
      idProvinsi: (_.isNaN(Number(searchParams.prov)) ? defaultValue.idProvinsi : Number(searchParams.prov)),
      idKabkot: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? kabVal : _.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
      tingkat: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? defaultValue.tingkat : _.isNaN(Number(searchParams.city)) ? 1 : 2)
   }

   const prov = await MasterProvinceGetAll()
   const city = await MasterKabGetByProvince({ idProvinsi: findData.idProvinsi })
   const candidate = await funGetCandidateActiveByArea({ find: findData })

   return (
      <ViewGenerateSwot param={findData} provinsi={prov} kabupaten={city} candidate={candidate} />
   )
}
