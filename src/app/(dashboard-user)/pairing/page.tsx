import { funGetAreaByDefault } from '@/modules/_global';
import { funGetAllCandidateFront, funGetUserDefaultFront } from '@/modules/candidate';
import { ViewPairingFront, funGetPairingRegional, funGetPairingRegionalNew } from '@/modules/pairing';
import React from 'react';

export default async function Page() {
  const can = await funGetAllCandidateFront()
  const daerah = await funGetAreaByDefault()
  const tingkatDef = await funGetUserDefaultFront()
  // const dataPairing = await funGetPairingRegional({})
  const dataPairing = await funGetPairingRegionalNew({})

  return (
    <ViewPairingFront candidate={can} data={dataPairing} area={daerah} tingkat={tingkatDef.tingkat} />
  );
}
