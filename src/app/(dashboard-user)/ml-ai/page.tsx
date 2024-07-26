import { funGetAllCandidateFront, funGetOneCandidateFront, funGetUserDefaultFront } from '@/modules/candidate';
import { ViewMlAi, funGetDateMlAiFront, funGetMlAiFront, funGetMlAiFrontV2, funGetOneMlAiByRequest } from '@/modules/mlai';
import React from 'react';

export default async function Page({ searchParams }: { searchParams: { data: any, request: any } }) {
  const canDef = await funGetUserDefaultFront()
  const req = await funGetOneMlAiByRequest({ req: searchParams.request, mlai: searchParams.data })
  // const data = await funGetMlAiFront({ candidate: canDef.idCandidate })
  const can = await funGetAllCandidateFront()
  const oneCandidate = await funGetOneCandidateFront({ candidate: canDef.idCandidate })
  const dataV2 = await funGetMlAiFrontV2({ candidate: canDef.idCandidate, date: (req?.id != null && req.dateContent != undefined) ? new Date(req.dateContent) : new Date(), time: (req?.id != null && req.id != undefined) ? req?.timeContent : null })
  const tanggal = await funGetDateMlAiFront({ candidate: canDef.idCandidate, date: (req?.dateContent != null && req.dateContent != undefined) ? new Date(req.dateContent) : new Date() })


  return (
    <ViewMlAi dataV2={dataV2} dataTanggal={tanggal} candidate={can} oneCandidate={oneCandidate} dateChoose={(req?.dateContent != null) ? new Date(req.dateContent) : new Date()} timeChoose={req?.timeContent} />
  );
}

