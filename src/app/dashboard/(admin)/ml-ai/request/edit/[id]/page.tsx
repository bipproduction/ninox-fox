import { EditRequest, funGetOneRequestAddMlAi } from "@/modules/mlai";

export default async function Page({ params }: { params: { id: string } }) {

   const data = await funGetOneRequestAddMlAi({ id: params.id })

   return (
      <EditRequest data={data} />
   )
}