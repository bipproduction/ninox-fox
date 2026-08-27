'use server'
import prisma from "@/modules/_global/bin/prisma"
import funGenerateDataPairing from "@/modules/pairing/back/fun/generate_data_pairing"
import moment from "moment"
import fs from "fs"

const FIRST_NAMES = ["Ahmad", "Muhammad", "Budi", "Agus", "Bambang", "Joko", "Andi", "Rudi", "Hendra", "Dedi", "Rizky", "Fajar", "Dian", "Wahyu", "Iwan", "Herman", "Yusuf", "Slamet", "Hadi", "Bayu", "Eko", "Anton", "Kurniawan", "Setiawan", "Rahmat"]
const LAST_NAMES = ["Santoso", "Wijaya", "Kusuma", "Pratama", "Setiawan", "Saputra", "Gunawan", "Hidayat", "Nugroho", "Susanto", "Firmansyah", "Ramadhan", "Purnomo", "Wibowo", "Sudrajat", "Permana", "Halim", "Suryadi", "Iskandar", "Maulana"]
const AVATAR_COLORS = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#009688", "#4CAF50", "#FF9800", "#795548", "#607D8B", "#00BCD4"]

function pickRandom(arr: string[]) {
   return arr[Math.floor(Math.random() * arr.length)]
}

function generateName(used: Set<string>) {
   let name = ""
   let tries = 0
   do {
      name = `${pickRandom(FIRST_NAMES)} ${pickRandom(LAST_NAMES)}`
      tries++
   } while (used.has(name) && tries < 20)
   used.add(name)
   return name
}

function getInitials(name: string) {
   const parts = name.trim().split(/\s+/)
   return parts.slice(0, 2).map(p => p[0].toUpperCase()).join("")
}

function pickColor(name: string) {
   const hash = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
   return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function generateAvatarSvg(name: string) {
   const initials = getInitials(name)
   const color = pickColor(name)
   return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="${color}"/><text x="50" y="50" font-family="Arial, sans-serif" font-size="40" fill="#fff" text-anchor="middle" dominant-baseline="central" font-weight="bold">${initials}</text></svg>`
}

export default async function funGenerateDataCandidate({ idProvinsi, idKabkot, tingkat, count }: { idProvinsi: number, idKabkot: number | null, tingkat: number, count: number }) {
   const used = new Set<string>()
   const created: { id: string, name: string }[] = []

   for (let i = 0; i < count; i++) {
      const name = generateName(used)
      const data = await prisma.candidate.create({
         data: {
            name,
            idProvinsi,
            idKabkot,
            tingkat
         },
         select: { id: true, name: true }
      })

      fs.writeFileSync(`./public/candidate/${data.id}.svg`, generateAvatarSvg(name))
      await prisma.candidate.update({
         where: { id: data.id },
         data: { img: `${data.id}.svg` }
      })

      created.push(data)
   }

   const pairs: { c1: string, c2: string }[] = []
   for (let i = 0; i + 1 < created.length; i += 2) {
      pairs.push({ c1: created[i].id, c2: created[i + 1].id })
   }

   if (pairs.length > 0) {
      await funGenerateDataPairing({ pairs, dates: [moment().format('YYYY-MM-DD')] })
   }

   return {
      candidates: created,
      pairsCreated: pairs.length
   }
}
