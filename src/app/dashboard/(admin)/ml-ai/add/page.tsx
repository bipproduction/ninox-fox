import { MasterKabGetByProvince, MasterProvinceGetAll } from "@/modules/_global";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import { AddMlAi } from "@/modules/mlai";
import _ from "lodash";

export default async function Page({searchParams}: {searchParams: {candidate: any, date: any, prov: any, city: any}}) {

    const dataMlAi = {
        idCandidate: (_.isNaN(Number(searchParams.candidate)) ? 0 : Number(searchParams.candidate)),
        idProvinsi: (_.isNaN(Number(searchParams.prov)) ? 0 : Number(searchParams.prov)),
        idKabkot: (_.isNaN(Number(searchParams.city)) ? 0 : Number(searchParams.city)),
        tingkat: (_.isNaN(Number(searchParams.city)) ? 1 : 2)
    }
    const pro = await MasterProvinceGetAll()
    const kab = await MasterKabGetByProvince({ idProvinsi: dataMlAi.idProvinsi })
    const candidate = await funGetCandidateActiveByArea({find: dataMlAi})

    return (
        <>
            <AddMlAi  params={dataMlAi} candidate={candidate} provinsi={pro} kabupaten={kab}/>
        </>
    )
}