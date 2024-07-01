'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash";

export default async function funGetEmotionPersenNew({ candidate }: { candidate: any }) {
   let dataC = null, format = <any>[]

   if (!_.isNull(candidate) && !_.isUndefined(candidate)) {
      dataC = await prisma.candidate.findUnique({
         where: {
            id: candidate
         }
      })
   }


   const data = await prisma.candidateEmotion.findMany({
      where: {
         idCandidate: candidate,
         dateEmotion: new Date()
      },
      select: {
         dateEmotion: true,
         confidence: true,
         supportive: true,
         positive: true,
         undecided: true,
         unsupportive: true,
         uncomfortable: true,
         negative: true,
         dissapproval: true,
         idKabkot: true,
         idKecamatan: true,
      }
   })

   if (dataC?.tingkat == 1) {
      format = _.map(_.groupBy(data, "idKabkot"), (v: any) => ({
         idArea: v[0].idKabkot,
         confidence: _.sumBy(v, 'confidence'),
         dissapproval: _.sumBy(v, 'dissapproval'),
         negative: _.sumBy(v, 'negative'),
         positive: _.sumBy(v, 'positive'),
         supportive: _.sumBy(v, 'supportive'),
         uncomfortable: _.sumBy(v, 'uncomfortable'),
         undecided: _.sumBy(v, 'undecided'),
         unsupportive: _.sumBy(v, 'unsupportive'),
         total: _.sum([
            _.sumBy(v, 'confidence'),
            _.sumBy(v, 'dissapproval'),
            _.sumBy(v, 'negative'),
            _.sumBy(v, 'positive'),
            _.sumBy(v, 'supportive'),
            _.sumBy(v, 'uncomfortable'),
            _.sumBy(v, 'undecided'),
            _.sumBy(v, 'unsupportive'),
         ])
      }))
   } else if (dataC?.tingkat == 2) {
      format = _.map(_.groupBy(data, "idKecamatan"), (v: any) => ({
         idArea: v[0].idKecamatan,
         confidence: _.sumBy(v, 'confidence'),
         dissapproval: _.sumBy(v, 'dissapproval'),
         negative: _.sumBy(v, 'negative'),
         positive: _.sumBy(v, 'positive'),
         supportive: _.sumBy(v, 'supportive'),
         uncomfortable: _.sumBy(v, 'uncomfortable'),
         undecided: _.sumBy(v, 'undecided'),
         unsupportive: _.sumBy(v, 'unsupportive'),
         total: _.sum([
            _.sumBy(v, 'confidence'),
            _.sumBy(v, 'dissapproval'),
            _.sumBy(v, 'negative'),
            _.sumBy(v, 'positive'),
            _.sumBy(v, 'supportive'),
            _.sumBy(v, 'uncomfortable'),
            _.sumBy(v, 'undecided'),
            _.sumBy(v, 'unsupportive'),
         ])
      }))
   }

   const total = _.reduce(
      format,
      (result, value) => {
         return {
            confidence: result.confidence + value.confidence,
            supportive: result.supportive + value.supportive,
            positive: result.positive + value.positive,
            undecided: result.undecided + value.undecided,
            unsupportive: result.unsupportive + value.unsupportive,
            uncomfortable: result.uncomfortable + value.uncomfortable,
            negative: result.negative + value.negative,
            dissapproval: result.dissapproval + value.dissapproval,
            value: result.value + value.total,
         };
      },
      {
         confidence: 0,
         supportive: 0,
         positive: 0,
         undecided: 0,
         unsupportive: 0,
         uncomfortable: 0,
         negative: 0,
         dissapproval: 0,
         value: 0,
      }
   );

   const positive = total.confidence + total.supportive + total.positive + total.undecided;
   const neutral = total.unsupportive + total.uncomfortable;
   const negative = total.negative + total.dissapproval;
   const totalEmotions = total.value;

   const allData = {
      positive: Number(((positive / totalEmotions) * 100).toFixed(2)),
      neutral: Number(((neutral / totalEmotions) * 100).toFixed(2)),
      negative: Number(((negative / totalEmotions) * 100).toFixed(2)),
   }


   return allData

}