"use server"
import prisma from "@/modules/_global/bin/prisma"
import moment from "moment"
import { revalidatePath } from "next/cache"

function pick<T>(arr: T[]): T {
   return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(arr: T[]) {
   const a = [...arr]
   for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
   }
   return a
}

const PEMBUKA = [
   "Berdasarkan pemantauan media sosial dan pemberitaan, elektabilitas {NAMA} pada {TGL} menunjukkan tren yang cukup dinamis.",
   "Analisis percakapan publik terkait {NAMA} pada {TGL} memperlihatkan sejumlah pola menarik yang perlu dicermati tim pemenangan.",
   "Sepanjang {TGL}, nama {NAMA} kembali menjadi salah satu topik yang diperbincangkan warganet di berbagai kanal digital.",
   "Rangkuman data pada {TGL} menempatkan {NAMA} dalam sorotan opini publik dengan intensitas percakapan yang meningkat.",
]

const ISisu = [
   "Isu ekonomi kerakyatan dan lapangan kerja masih mendominasi harapan masyarakat terhadap figur seperti {NAMA}.",
   "Program pendidikan dan layanan kesehatan menjadi materi yang paling banyak dikaitkan publik dengan sosok {NAMA}.",
   "Sentimen terhadap {NAMA} banyak dipengaruhi oleh respons atas persoalan infrastruktur dan pelayanan publik di daerah.",
   "Persepsi integritas dan rekam jejak {NAMA} kerap menjadi bahan diskusi utama di kalangan pemilih muda.",
   "Narasi keberpihakan pada wong cilik memperkuat citra {NAMA} di segmen pemilih menengah ke bawah.",
]

const ISsentimen = [
   "Sentimen positif terlihat menguat, ditandai dukungan yang lebih ekspresif dari basis pendukung.",
   "Percakapan netral masih mendominasi, menunjukkan sebagian pemilih belum menentukan sikap.",
   "Terdapat riak sentimen negatif dari isu tertentu, namun eskalasinya masih terkendali.",
   "Momentum dukungan cenderung stabil dengan sedikit kenaikan dibanding periode sebelumnya.",
   "Antusiasme akar rumput terpantau naik, terutama pada kanal berbasis komunitas.",
]

const REKOMENDASI = [
   "Tim disarankan memperkuat komunikasi pada isu yang sedang menjadi perhatian agar momentum tidak hilang.",
   "Direkomendasikan memperluas jangkauan pesan ke segmen pemilih yang masih ragu melalui pendekatan yang lebih personal.",
   "Penting untuk mengantisipasi isu negatif secara cepat dengan klarifikasi berbasis data dan fakta lapangan.",
   "Penguatan kehadiran di tingkat akar rumput dinilai efektif untuk mengonversi simpati menjadi dukungan nyata.",
   "Konsistensi narasi program unggulan perlu dijaga agar persepsi publik tetap terarah dan terukur.",
]

const PENUTUP = [
   "Secara keseluruhan, posisi {NAMA} pada {TGL} berada pada arah yang menjanjikan bila strategi dijalankan konsisten.",
   "Kesimpulannya, dinamika pada {TGL} membuka peluang bagi {NAMA} untuk memperkuat konsolidasi dukungan.",
   "Dengan demikian, {TGL} menjadi catatan penting bagi tim {NAMA} dalam merumuskan langkah berikutnya.",
   "Pada akhirnya, hasil pantauan {TGL} menegaskan perlunya evaluasi berkala atas efektivitas kampanye {NAMA}.",
]

/**
 * Menyusun konten analisis beberapa paragraf untuk satu kandidat pada satu tanggal.
 * Tiap paragraf diambil acak dari kumpulan kalimat sehingga hasil tiap baris berbeda.
 */
function buildContent(nama: string, tanggal: string) {
   const tgl = moment(tanggal).format('DD MMMM YYYY')
   const fill = (s: string) => s.replace(/\{NAMA\}/g, nama).replace(/\{TGL\}/g, tgl)

   const isuBody = shuffle(ISisu).slice(0, 2).map(fill).join(" ")
   const sentimenBody = shuffle(ISsentimen).slice(0, 2).map(fill).join(" ")
   const rekomBody = shuffle(REKOMENDASI).slice(0, 2).map(fill).join(" ")

   const paragraphs = [
      fill(pick(PEMBUKA)),
      isuBody,
      sentimenBody,
      rekomBody,
      fill(pick(PENUTUP)),
   ]

   return paragraphs.join("\n\n")
}

// jam tetap 01:00 untuk seluruh data yang di-generate
function time0100() {
   const y = new Date('1970-01-01 01:00')
   return new Date(y.getTime() - (y.getTimezoneOffset() * 60000)).toISOString()
}

/**
 * Generate data ML-AI dummy untuk kombinasi kandidat × tanggal.
 * Tiap kombinasi menghasilkan satu baris MlAi dengan konten beberapa paragraf,
 * dateContent sesuai tanggal, dan timeContent tetap 01:00. Overwrite: data lama
 * pada kombinasi yang sama dihapus lebih dulu.
 * @param candidates daftar id kandidat
 * @param dates daftar tanggal (YYYY-MM-DD)
 * @returns jumlah baris yang dibuat
 */
export default async function funGenerateMlAi({ candidates, dates }: { candidates: string[], dates: string[] }) {
   const timeInput = time0100()
   let created = 0

   for (const idCandidate of candidates) {
      const dataCandidate = await prisma.candidate.findUnique({
         where: { id: idCandidate },
         select: { id: true, name: true }
      })
      if (!dataCandidate) continue
      const nama = dataCandidate.name ?? "Kandidat"

      for (const date of dates) {
         const dateContent = new Date(moment(date).format('YYYY-MM-DD'))

         await prisma.mlAi.deleteMany({
            where: { idCandidate, dateContent }
         })

         await prisma.mlAi.create({
            data: {
               idCandidate,
               dateContent,
               timeContent: timeInput,
               content: buildContent(nama, date)
            }
         })
         created++
      }
   }

   revalidatePath("dashboard/ml-ai")
   revalidatePath("/data-learner")

   return { success: true, created, message: "Sukses" }
}
