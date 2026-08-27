"use server"
import prisma from "@/modules/_global/bin/prisma"

const TEMPLATE: Record<string, string[]> = {
   STRENGTH: [
      "<p><strong>{name}</strong> memiliki basis dukungan yang kuat di kalangan akar rumput berkat rekam jejak yang konsisten dalam menyerap aspirasi masyarakat.</p>",
      "<p>Pengalaman <strong>{name}</strong> dalam mengelola isu-isu strategis daerah dinilai menjadi modal utama yang membedakannya dari kandidat lain.</p>",
      "<p>Jaringan relasi <strong>{name}</strong> yang luas, baik di tingkat pusat maupun daerah, dinilai mempermudah koordinasi program ke depan.</p>",
      "<p>Citra <strong>{name}</strong> sebagai sosok yang dekat dengan masyarakat menjadi kekuatan utama dalam membangun elektabilitas.</p>",
   ],
   WEAKNESS: [
      "<p>Minimnya eksposur <strong>{name}</strong> di sejumlah wilayah pemilih baru dinilai menjadi tantangan tersendiri.</p>",
      "<p><strong>{name}</strong> dinilai masih perlu memperkuat basis dukungan di segmen pemilih muda yang jumlahnya terus bertambah.</p>",
      "<p>Keterbatasan sumber daya kampanye dinilai menjadi kendala <strong>{name}</strong> dalam menjangkau wilayah yang lebih luas.</p>",
      "<p>Beberapa kalangan menilai komunikasi publik <strong>{name}</strong> masih perlu ditingkatkan agar pesan program lebih mudah dipahami.</p>",
   ],
   OPPORTUNITY: [
      "<p>Dinamika politik yang berkembang membuka peluang bagi <strong>{name}</strong> untuk memperluas koalisi dukungan.</p>",
      "<p>Tingginya minat masyarakat terhadap perubahan kepemimpinan dinilai menjadi momentum yang menguntungkan bagi <strong>{name}</strong>.</p>",
      "<p>Dukungan dari tokoh masyarakat dan organisasi kemasyarakatan membuka peluang perluasan basis pemilih <strong>{name}</strong>.</p>",
      "<p>Perkembangan isu ekonomi lokal memberi ruang bagi <strong>{name}</strong> untuk menawarkan solusi yang relevan dengan kebutuhan warga.</p>",
   ],
   THREAT: [
      "<p>Konsolidasi kandidat lawan yang semakin solid dinilai menjadi ancaman serius bagi elektabilitas <strong>{name}</strong>.</p>",
      "<p>Isu negatif yang beredar di media sosial berpotensi memengaruhi persepsi publik terhadap <strong>{name}</strong> jika tidak segera diklarifikasi.</p>",
      "<p>Dinamika politik yang cepat berubah dinilai dapat mengancam soliditas koalisi pendukung <strong>{name}</strong>.</p>",
      "<p>Persaingan ketat dari kandidat dengan basis massa serupa dinilai menjadi tantangan tersendiri bagi <strong>{name}</strong>.</p>",
   ],
}

function pickRandom(arr: string[]) {
   return arr[Math.floor(Math.random() * arr.length)]
}

export default async function funGenerateDataSwot({ candidates }: { candidates: { id: string, name: string }[] }) {
   let count = 0

   for (const cand of candidates) {
      for (const category of Object.keys(TEMPLATE)) {
         const content = pickRandom(TEMPLATE[category]).replaceAll("{name}", cand.name)

         await prisma.swot.create({
            data: {
               idCandidate: cand.id,
               category,
               content
            }
         })
         count++
      }
   }

   return { count }
}
