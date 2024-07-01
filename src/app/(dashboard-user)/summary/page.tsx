import { funGetAudienceFront } from '@/modules/audience';
import { funGetOneCandidateFront, funGetUserDefaultFront } from '@/modules/candidate';
import { ViewSummary, funGetEmotionChart, funGetEmotionChartNew, funGetEmotionPersen, funGetEmotionPersenNew, funGetEmotionTable, funGetEmotionTableNew } from '@/modules/emotion';
import { funGetPairingCandidateSummary } from '@/modules/pairing';
import moment from 'moment';
import React from 'react';

export default async function Page() {
  const can = await funGetUserDefaultFront()
  const oneCandidate = await funGetOneCandidateFront({ candidate: can.idCandidate })
  const dataLocked = await funGetAudienceFront()
  const dataPairingCandidate = await funGetPairingCandidateSummary()
  // const dataEmotion = await funGetEmotionTable({ candidate: oneCandidate?.id })
  // const dataPersen = await funGetEmotionPersen({ candidate: oneCandidate?.id })
  // const dataChart = await funGetEmotionChart({ candidate: oneCandidate?.id, startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })
  const dataEmotionNew = await funGetEmotionTableNew({ candidate: oneCandidate?.id })
  const dataPersenNew = await funGetEmotionPersenNew({ candidate: oneCandidate?.id })
  const dataChartNew = await funGetEmotionChartNew({ candidate: oneCandidate?.id, startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })

  return (
    <ViewSummary oneCandidate={oneCandidate} tingkat={can.tingkat} emoTable={dataEmotionNew} emoPersen={dataPersenNew} emoChart={dataChartNew} locked={dataLocked} pairingCandidate={dataPairingCandidate} />
  );
}
