import { funGetAudienceDetailFront } from '@/modules/audience'
import { funGetLtaDetailFront } from '@/modules/leader_trait_assessment'
import { funGetPctDetailFront } from '@/modules/public_concern_trend'
import { funGetRhiFront } from '@/modules/region_hot_issue'
import { ViewDetailRegionalInsights, funGetAreaDetailRegional, funGetEmotionDetailRegional, funGetEmotionDetailRegionalNew } from '@/modules/regional_insights'
import React from 'react'

export default async function Page({ params }: { params: { idCandidate: string, idArea: string } }) {
  // const dataDb = await funGetEmotionDetailRegional({ candidate: params.idCandidate, area: params.idArea })
  const dataDb = await funGetEmotionDetailRegionalNew({ candidate: params.idCandidate, area: params.idArea })
  const dataAudience = await funGetAudienceDetailFront({ candidate: params.idCandidate, area: params.idArea })
  const dataPct = await funGetPctDetailFront({ candidate: params.idCandidate, area: params.idArea })
  const dataLta = await funGetLtaDetailFront({ candidate: params.idCandidate, area: params.idArea })
  const dataRhi = await funGetRhiFront({ candidate: params.idCandidate, area: params.idArea })
  const dataWilayah = await funGetAreaDetailRegional({ candidate: params.idCandidate, area: params.idArea })

  return (
    <ViewDetailRegionalInsights rhi={dataRhi} area={dataDb.area} emotion={dataDb.data} audience={dataAudience} pct={dataPct} lta={dataLta} wilayah={dataWilayah} />
  )
}
