import { funGetAllCandidateFront, funGetUserDefaultFront } from '@/modules/candidate';
import { ViewPopularity, funGetPopularityToday, funGetPopularityTodayNew, funGetRateChart } from '@/modules/popularity';
import moment from 'moment';
import React from 'react';

export default async function Page() {
  // const dataPairingToday = await funGetPopularityToday({})
  const dataPairingToday = await funGetPopularityTodayNew({})
  const can = await funGetAllCandidateFront()
  const valdefault = await funGetUserDefaultFront()
  const dataRateChart = await funGetRateChart({
    candidate1: dataPairingToday.pairingCandidate.idCandidate1,
    candidate2: dataPairingToday.pairingCandidate.idCandidate2,
    startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD")
  })

  return (
    <ViewPopularity candidate={can} pairingToday={dataPairingToday} chartRate={dataRateChart} tingkat={valdefault.tingkat} />
  );
}

