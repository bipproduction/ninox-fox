import { ListRequest, funGetAllRequestMlai } from "@/modules/mlai";

export default async function Page() {
   const dataPending = await funGetAllRequestMlai({ page: 1, status: 0 })
   const dataTerjawab = await funGetAllRequestMlai({ page: 1, status: 1 })
   return (
      <>
         <ListRequest dataPending={dataPending.data} pagePending={dataPending.nPage} nPending={dataPending.total} dataTerjawab={dataTerjawab.data} pageTerjawab={dataTerjawab.nPage} nTerjawab={dataTerjawab.total} />
      </>
   )
}