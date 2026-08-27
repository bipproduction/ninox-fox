import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'

const CONTENT_TYPE_BY_EXT: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    svg: "image/svg+xml",
    gif: "image/gif"
}

export async function GET(req: NextRequest, { params }: { params: { name: any } }) {
    const real = `./public/${params.name[0]}/${params.name[1]}`

    let fl;
    let ext = params.name[1]?.split(".").pop()?.toLowerCase()

    if (fs.existsSync(real)) {
        fl = fs.readFileSync(real)
    } else {
        if (params.name[0] == "candidate") {
            fl = fs.readFileSync(`./public/profile.png`)
        } else {
            fl = fs.readFileSync(`./public/ninox.png`)
        }
        ext = "png"
    }

    return new NextResponse(fl, {
        headers: {
            "Content-Type": CONTENT_TYPE_BY_EXT[ext] || "image/png"
        }
    })

}