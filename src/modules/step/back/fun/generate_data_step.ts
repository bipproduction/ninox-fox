"use server"
import prisma from "@/modules/_global/bin/prisma"

const CATEGORIES = ["SOSIAL", "TEKNOLOGI", "EKONOMI", "POLITIK"]

const TEMPLATE_POSITIVE: Record<string, string[]> = {
   SOSIAL: [
      "<p><strong>{name}</strong> dinilai aktif membangun program sosial yang menyentuh langsung kebutuhan warga, mulai dari bantuan kesehatan hingga pemberdayaan masyarakat kurang mampu.</p>",
      "<p>Kehadiran <strong>{name}</strong> di tengah masyarakat dinilai konsisten, kerap turun langsung ke lapangan untuk mendengar keluhan warga dan menindaklanjutinya dengan program nyata.</p>",
      "<p>Sejumlah kalangan menilai <strong>{name}</strong> berhasil merangkul berbagai elemen masyarakat, termasuk tokoh agama dan komunitas lokal, sehingga citra sosialnya terus menguat.</p>",
      "<p>Program bantuan sosial yang digagas <strong>{name}</strong> dinilai tepat sasaran dan direspons positif oleh warga di berbagai wilayah.</p>",
   ],
   TEKNOLOGI: [
      "<p><strong>{name}</strong> dinilai adaptif terhadap perkembangan teknologi, terlihat dari pemanfaatan media digital untuk berkomunikasi langsung dengan masyarakat.</p>",
      "<p>Gagasan digitalisasi layanan publik yang disampaikan <strong>{name}</strong> mendapat sambutan positif, terutama dari kalangan generasi muda.</p>",
      "<p><strong>{name}</strong> dinilai memiliki visi teknologi yang jelas untuk mendorong transformasi digital di sektor pemerintahan maupun ekonomi daerah.</p>",
      "<p>Pemanfaatan platform digital oleh <strong>{name}</strong> untuk sosialisasi program dinilai efektif menjangkau pemilih muda.</p>",
   ],
   EKONOMI: [
      "<p>Kebijakan ekonomi yang ditawarkan <strong>{name}</strong> dinilai berpihak pada pelaku usaha kecil dan menengah.</p>",
      "<p><strong>{name}</strong> dinilai memiliki pemahaman mendalam terhadap persoalan ekonomi lokal, khususnya dalam mendorong pertumbuhan sektor UMKM.</p>",
      "<p>Program penguatan ekonomi kerakyatan yang digagas <strong>{name}</strong> dinilai realistis dan dapat diimplementasikan.</p>",
      "<p>Rekam jejak <strong>{name}</strong> dalam mendorong investasi daerah dinilai positif oleh sejumlah pengamat ekonomi.</p>",
   ],
   POLITIK: [
      "<p><strong>{name}</strong> dinilai piawai membangun komunikasi politik yang inklusif dengan berbagai kelompok kepentingan.</p>",
      "<p>Sikap <strong>{name}</strong> yang terbuka terhadap dialog lintas partai dinilai memperkuat posisi politiknya menjelang kontestasi.</p>",
      "<p>Konsistensi sikap politik <strong>{name}</strong> dinilai menjadi salah satu faktor penguat elektabilitas.</p>",
      "<p><strong>{name}</strong> dinilai mampu menjaga soliditas koalisi pendukung di tengah dinamika politik yang berkembang.</p>",
   ],
}

const TEMPLATE_NEGATIVE: Record<string, string[]> = {
   SOSIAL: [
      "<p>Sejumlah warga menilai program sosial yang dijalankan <strong>{name}</strong> belum merata dan cenderung menyasar wilayah tertentu saja.</p>",
      "<p><strong>{name}</strong> dinilai kurang responsif terhadap sejumlah keluhan masyarakat yang disampaikan melalui berbagai kanal.</p>",
      "<p>Kritik muncul terkait minimnya keterlibatan <strong>{name}</strong> dalam kegiatan sosial di beberapa wilayah basis pemilih.</p>",
      "<p>Sejumlah kalangan menilai pendekatan sosial <strong>{name}</strong> masih bersifat seremonial dan belum menyentuh akar masalah.</p>",
   ],
   TEKNOLOGI: [
      "<p><strong>{name}</strong> dinilai masih tertinggal dalam pemanfaatan teknologi untuk menjangkau pemilih di wilayah pelosok.</p>",
      "<p>Minimnya kehadiran digital <strong>{name}</strong> dinilai membuat sosialisasi program kurang menjangkau kalangan muda.</p>",
      "<p>Sejumlah pengamat menilai gagasan transformasi digital yang ditawarkan <strong>{name}</strong> masih normatif dan belum konkret.</p>",
      "<p><strong>{name}</strong> dinilai perlu memperkuat tim komunikasi digital agar pesan kampanye lebih efektif.</p>",
   ],
   EKONOMI: [
      "<p>Kritik muncul terhadap program ekonomi <strong>{name}</strong> yang dinilai belum menjawab persoalan ketimpangan di sejumlah wilayah.</p>",
      "<p>Sejumlah pelaku usaha menilai kebijakan ekonomi <strong>{name}</strong> masih belum jelas arah implementasinya.</p>",
      "<p><strong>{name}</strong> dinilai perlu memperkuat gagasan konkret untuk mengatasi persoalan lapangan kerja di daerah.</p>",
      "<p>Minimnya sosialisasi program ekonomi <strong>{name}</strong> dinilai menjadi salah satu kelemahan dalam meyakinkan pemilih.</p>",
   ],
   POLITIK: [
      "<p>Sejumlah pihak menilai <strong>{name}</strong> masih menghadapi tantangan dalam merangkul kelompok politik yang berseberangan.</p>",
      "<p>Ketegangan internal koalisi pendukung <strong>{name}</strong> dinilai berpotensi mengganggu soliditas dukungan politik.</p>",
      "<p>Kritik disampaikan terkait sikap <strong>{name}</strong> yang dinilai kurang tegas dalam merespons isu politik terkini.</p>",
      "<p><strong>{name}</strong> dinilai perlu memperkuat komunikasi politik agar tidak menimbulkan persepsi negatif di publik.</p>",
   ],
}

function pickRandom(arr: string[]) {
   return arr[Math.floor(Math.random() * arr.length)]
}

export default async function funGenerateDataStep({ candidates }: { candidates: { id: string, name: string }[] }) {
   let count = 0

   for (const cand of candidates) {
      for (const category of CATEGORIES) {
         const positiveContent = pickRandom(TEMPLATE_POSITIVE[category]).replaceAll("{name}", cand.name)
         const negativeContent = pickRandom(TEMPLATE_NEGATIVE[category]).replaceAll("{name}", cand.name)

         await prisma.step.create({
            data: {
               idCandidate: cand.id,
               category,
               sentiment: 1,
               content: positiveContent
            }
         })
         count++

         await prisma.step.create({
            data: {
               idCandidate: cand.id,
               category,
               sentiment: 2,
               content: negativeContent
            }
         })
         count++
      }
   }

   return { count }
}
