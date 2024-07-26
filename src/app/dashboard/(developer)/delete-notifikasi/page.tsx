import { ViewDeleteNotifikasi } from "@/modules/notifikasi";
import { funGetAllConfUser } from "@/modules/user";

export default async function Page() {
   const data = await funGetAllConfUser()

   return (
      <>
         <ViewDeleteNotifikasi data={data}/>
      </>
   )
}