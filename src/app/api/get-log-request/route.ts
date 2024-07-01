import prisma from "@/modules/_global/bin/prisma"
import { funGetUserByCookies } from "@/modules/auth"

export async function GET(req: Request) {
    const take = +(new URL(req.url).searchParams.get('take') || "15")
    const skip = +(new URL(req.url).searchParams.get('skip') || "0")
    const user = await funGetUserByCookies()

    const data = await prisma.mlAiRequest.findMany({
        take,
        skip,
        where: {
            idUser: user?.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return Response.json(data)
} 