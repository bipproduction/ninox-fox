import { MasterKabGetByProvince, MasterKecGetByKab, MasterProvinceGetAll } from "@/modules/_global";
import { funGetUserDefaultFront } from "@/modules/candidate";
import { ViewPublic, funDownloadPCT, funGetPctByArea } from "@/modules/public_concern_trend";
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
  const dataDB = await funGetPctByArea({ find: findData })
  const dataDownload = await funDownloadPCT({ find: findData })
  
  return <ViewPublic param={findData} provinsi={prov} kabupaten={city} kecamatan={kec} datatable={dataDB} datadownload={dataDownload} />;
}

export default Page;
