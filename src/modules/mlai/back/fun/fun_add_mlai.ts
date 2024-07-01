"use server"
import prisma from "@/modules/_global/bin/prisma";
import moment from "moment";
import { revalidatePath } from "next/cache";
import mtqq_client from "../../../_global/util/mqtt_client"

export default async function funAddMlAi({ body, content }: { body: any, content: any }) {
  let dateInput, timeInput
  const now = new Date()
  if (body.dateContent == '' || body.timeContent == '') {
    dateInput = moment(now).format('YYYY-MM-DD')
    let y = new Date('1970-01-01 ' + moment(now).format('HH:mm'))
    timeInput = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString()
  } else {
    dateInput = body.dateContent
    let y = new Date('1970-01-01 ' + body.timeContent)
    timeInput = new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString()
  }



  const data = await prisma.mlAi.create({
    data: {
      idRequestMlAi: body.idRequest,
      idCandidate: body.idCandidate,
      dateContent: new Date(dateInput),
      timeContent: timeInput,
      content: content
    },
    select: {
      id: true,
      Candidate: {
        select: {
          name: true,
          AreaKabkot: {
            select: {
              name: true
            }
          },
          AreaProvinsi: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  if (body.idRequest != null) {
    const upd = await prisma.mlAiRequest.update({
      where: {
        id: body.idRequest
      },
      data: {
        status: 1
      }
    })

    mtqq_client.publish("app_ninox_fox_be", JSON.stringify({
      "statusAdmin": true,
      "kategori": '-',
    }))

    mtqq_client.publish("app_ninox_fox_reload", JSON.stringify({
      "role": 'user',
      "page": 'data-learner'
    }))
  }

  revalidatePath('dashboard/ml-ai/request')
  revalidatePath('dashboard/ml-ai/')
  revalidatePath('/ml-ai')
  revalidatePath('/data-learner')
  revalidatePath("dashboard/ml-ai?prov" + data.Candidate.AreaProvinsi + "&city" + data.Candidate.AreaKabkot)

  return {
    success: true,
    data: data.id,
    message: "Success"
  }
}