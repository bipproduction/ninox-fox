import { MasterKabGetByProvince, MasterProvinceGetAll } from "@/modules/_global";
import { funGetCandidateActiveByArea, funGetUserDefaultFront } from "@/modules/candidate";
import { AddMlAi, funGetOneRequestAddMlAi } from "@/modules/mlai";
import _ from "lodash";

export default async function Page({ searchParams }: { searchParams: { candidate: any, date: any, prov: any, city: any, req: any } }) {
    const defaultValue = await funGetUserDefaultFront()
    const kabVal = (_.isNull(defaultValue.idKabkot) || _.isUndefined(defaultValue.idKabkot)) ? 0 : defaultValue.idKabkot
    const dataMlAi = {
        idCandidate: (_.isNaN(Number(searchParams.candidate)) ? 0 : Number(searchParams.candidate)),
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? defaultValue.idProvinsi : Number(searchParams.prov)),
        idKabkot: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? kabVal : _.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
        tingkat: (_.isNaN(Number(searchParams.city)) && _.isNaN(Number(searchParams.prov)) ? defaultValue.tingkat : _.isNaN(Number(searchParams.city)) ? 1 : 2),
        idRequest: searchParams.req
    }
    const request = await funGetOneRequestAddMlAi({ id: dataMlAi.idRequest })
    const pro = await MasterProvinceGetAll()
    const kab = await MasterKabGetByProvince({ idProvinsi: dataMlAi.idProvinsi })
    const candidate = await funGetCandidateActiveByArea({ find: dataMlAi })

    return (
        <>
            <AddMlAi params={dataMlAi} req={request} candidate={candidate} provinsi={pro} kabupaten={kab} />
        </>
    )
}