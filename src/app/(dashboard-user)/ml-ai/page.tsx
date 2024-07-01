import { funGetAllCandidateFront, funGetOneCandidateFront, funGetUserDefaultFront } from '@/modules/candidate';
import { ViewMlAi, funGetDateMlAiFront, funGetMlAiFront, funGetMlAiFrontV2 } from '@/modules/mlai';
import React from 'react';

export default async function Page() {
  const canDef = await funGetUserDefaultFront()
  // const data = await funGetMlAiFront({ candidate: canDef.idCandidate })
  const can = await funGetAllCandidateFront()
  const oneCandidate = await funGetOneCandidateFront({ candidate: canDef.idCandidate })
  const dataV2 = await funGetMlAiFrontV2({ candidate: canDef.idCandidate, date: new Date() })
  const tanggal = await funGetDateMlAiFront({ candidate: canDef.idCandidate, date: new Date() })

  return (
    <ViewMlAi dataV2={dataV2} dataTanggal={tanggal} candidate={can} oneCandidate={oneCandidate} />
  );
} 

