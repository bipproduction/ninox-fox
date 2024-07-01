'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash";
import moment from "moment";

export default async function funGetEmotionChartNew({ candidate, startDate, endDate }: { candidate: any, startDate: any, endDate: any }) {

   let data = <any>[]

   if (!_.isNull(candidate) && !_.isUndefined(candidate)) {
      data = await prisma.candidateEmotion.findMany({
         where: {
            idCandidate: candidate,
            dateEmotion: {
               gte: new Date(startDate),
               lte: new Date(endDate),
            }
         },
         orderBy: {
            dateEmotion: 'asc'
         }
      })
   }


   const groupedData = _.groupBy(data, (d: any) => d.dateEmotion.toDateString())

   const result = Object.keys(groupedData).map((dateStr) => {
      const sentimentData = groupedData[dateStr];

      const sum = sentimentData.reduce(
         (result: any, value: any) => ({
            confidence: result.confidence + value.confidence,
            supportive: result.supportive + value.supportive,
            positive: result.positive + value.positive,
            undecided: result.undecided + value.undecided,
            unsupportive: result.unsupportive + value.unsupportive,
            uncomfortable: result.uncomfortable + value.uncomfortable,
            negative: result.negative + value.negative,
            dissapproval: result.dissapproval + value.dissapproval
         }),
         {
            confidence: 0,
            supportive: 0,
            positive: 0,
            undecided: 0,
            unsupportive: 0,
            uncomfortable: 0,
            negative: 0,
            dissapproval: 0
         }
      );

      const totalSum = _.sum(Object.values(sum));

      const positive = _.round(((sum.confidence + sum.supportive + sum.positive + sum.undecided) / totalSum) * 100, 2);
      const neutral = _.round(((sum.unsupportive + sum.uncomfortable) / totalSum) * 100, 2);
      const negative = _.round(((sum.negative + sum.dissapproval) / totalSum) * 100, 2);

      return {
         date: moment(dateStr).format('DD-MM-YYYY'),
         positive,
         neutral,
         negative
      };
   });

   return result
}