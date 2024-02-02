import { MasterProvinceGetAll } from '@/modules/_global';
import { ViewInfrastrukturAndTransportasi } from '@/modules/temporary';
import React from 'react';

export default async function Page() {
  const dataProv = await MasterProvinceGetAll()

  return (
    <>
      <ViewInfrastrukturAndTransportasi prov={dataProv} />
    </>
  );
}
