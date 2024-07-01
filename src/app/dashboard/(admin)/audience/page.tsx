import { MasterKabGetByProvince, MasterKecGetByKab, MasterProvinceGetAll } from "@/modules/_global";
import { ViewAudience, funDownloadAudience, funGetAudienceByArea } from "@/modules/audience";
import { funGetUserDefaultFront } from "@/modules/candidate";
import _ from "lodash";
import React from "react";

async function Page({ searchParams }: { searchParams: { prov: any, city: any, kec: any } }) {
  const defaultValue = await funGetUserDefaultFront()
  const kabVal = (_.isNull(defaultValue.idKabkot) || _.isUndefined(defaultValue.idKabkot)) ? 0 : defaultValue.idKabkot
  const findData = {
    idProvinsi: (_.isNaN(Number(searchParams.prov)) ? defaultValue.idProvinsi : Number(searchParams.prov)),
    idKabkot: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? kabVal : _.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
    idKec: (_.isNaN(Number(searchParams.kec)) ? 0 : Number(searchParams.kec)),
  }

  const prov = await MasterProvinceGetAll()
  const city = await MasterKabGetByProvince({ idProvinsi: findData.idProvinsi })
  const kec = await MasterKecGetByKab({ idKabkot: findData.idKabkot })
  const dataDB = await funGetAudienceByArea({ find: findData })
  const dataDownload = await funDownloadAudience({ find: findData })

  return <ViewAudience param={findData} provinsi={prov} kabupaten={city} kecamatan={kec} datatable={dataDB} datadownload={dataDownload} />;
}

export default Page;
