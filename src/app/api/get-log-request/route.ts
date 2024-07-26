import prisma from "@/modules/_global/bin/prisma"
import { funGetUserByCookies } from "@/modules/auth"
import { funGetUserDefaultFront } from "@/modules/candidate"

export async function GET(req: Request) {
    const take = +(new URL(req.url).searchParams.get('take') || "15")
    const skip = +(new URL(req.url).searchParams.get('skip') || "0")
    const user = await funGetUserByCookies()
    const can = await funGetUserDefaultFront()

    const data = await prisma.mlAiRequest.findMany({
        take,
        skip,
        where: {
            idUser: user?.id,
            idCandidate: can?.idCandidate
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return Response.json(data)
} 