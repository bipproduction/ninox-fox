import { MasterKabGetByProvince, MasterProvinceGetAll } from '@/modules/_global';
import { funGetUserDefaultFront } from '@/modules/candidate';
import { ListStep, funGetAllStap } from '@/modules/step';
import _ from 'lodash';
import React from 'react';

export default async function Page({ searchParams }: { searchParams: { prov: string, city: string } }) {
  const defaultValue = await funGetUserDefaultFront()
  const kabVal = (_.isNull(defaultValue.idKabkot) || _.isUndefined(defaultValue.idKabkot)) ? 0 : defaultValue.idKabkot
  const datastep = {
    idProvinsi: (_.isNaN(Number(searchParams.prov)) ? defaultValue.idProvinsi : Number(searchParams.prov)),
    idKabkot: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? kabVal : _.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
    tingkat: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? defaultValue.tingkat : _.isNaN(Number(searchParams.city)) ? 1 : 2)
  }

  const pro = await MasterProvinceGetAll()
  const kab = await MasterKabGetByProvince({idProvinsi: datastep.idProvinsi})
  const dataDB = await funGetAllStap({find: datastep})
  return (
    <>
      <ListStep params={datastep} provinsi={pro} kabupaten={kab} datatable={dataDB} />
    </>
  );
}
