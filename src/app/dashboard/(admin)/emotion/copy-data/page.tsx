import { MasterKabGetByProvince, MasterProvinceGetAll } from "@/modules/_global";
import { funGetCandidateActiveByArea, funGetUserDefaultFront } from "@/modules/candidate";
import { ViewCopyData } from "@/modules/emotion";
import React from "react";

async function Page() {
  const prov = await MasterProvinceGetAll()
  const defaultValue = await funGetUserDefaultFront()
  const kab = await MasterKabGetByProvince({idProvinsi: defaultValue.idProvinsi})
  const candidate = await funGetCandidateActiveByArea({find: {idProvinsi: defaultValue.idProvinsi, idKabkot: defaultValue.idKabkot, tingkat: defaultValue.tingkat}})

  return <ViewCopyData provinsi={prov} kabupaten={kab} candidate={candidate} valDef={defaultValue}/>;
}

export default Page;
