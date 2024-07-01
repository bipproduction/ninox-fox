'use client'
import { useEffect } from "react"
import mtqq_client from "./mqtt_client"

export default function MqttLoad() {
   useEffect(() => {
      mtqq_client.on("connect", () => {
         // console.log("connect")
         mtqq_client.subscribe("app_ninox_fox")
      })

      mtqq_client.on("message", (topic, message) => {
         const data = JSON.parse(message.toString())
         const data_filter = data.user=="userCoba1234" ? true: false
         // console.log(data, data_filter)
      })
   }, [])
   return <>

   </>
}