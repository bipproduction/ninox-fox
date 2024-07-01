import { funGetAudienceFront } from '@/modules/audience';
import { funGetAllCandidateFront, funGetOneCandidateFront, funGetUserDefaultFront } from '@/modules/candidate';
import { funGetLtaFront } from '@/modules/leader_trait_assessment';
import { funGetPctFront } from '@/modules/public_concern_trend';
import { ViewRegionalInsights, funGetEmotionRegionalInsight, funGetEmotionRegionalInsightNew } from '@/modules/regional_insights';
import React from 'react';

export default async function Page() {
  const canDef = await funGetUserDefaultFront()
  const can = await funGetAllCandidateFront()
  const dataAudience = await funGetAudienceFront()
  const dataPct = await funGetPctFront()
  const dataLta = await funGetLtaFront()
  const oneCandidate = await funGetOneCandidateFront({ candidate: canDef.idCandidate })
  // const dataDb = await funGetEmotionRegionalInsight({})
  const dataDb = await funGetEmotionRegionalInsightNew({})

  return (
    <>
      <ViewRegionalInsights oneCandidate={oneCandidate} lta={dataLta} emotion={dataDb} candidate={can} audience={dataAudience} pct={dataPct} />
    </>
  );
}

