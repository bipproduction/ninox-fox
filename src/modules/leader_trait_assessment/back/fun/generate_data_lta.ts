'use server'
import prisma from "@/modules/_global/bin/prisma"
import _ from "lodash"

// Bobot dasar per kategori: berbeda-beda agar ada variasi, tapi rentangnya dibatasi
// (terkecil 7, terbesar 16 -> rasio ~2.3x) supaya SEMUA kategori tetap terlihat di
// grafik radar (tidak ada yang mendekati 0%) namun perbedaan antar kategori tetap jelas.
const BASE_WEIGHTS = [7, 8, 9, 10, 11, 12, 13, 15, 16]

function shuffle<T>(arr: T[]) {
   const a = [...arr]
   for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
   }
   return a
}

/**
 * Membagi `sum` ke sejumlah kategori sesuai bobot dasar + jitter kecil per baris,
 * lalu dibulatkan ke integer dengan total tetap sama dengan `sum`.
 * Karena bobot dasar tetap sama antar kelurahan (hanya diacak sekali per generate),
 * persentase agregat pada grafik mengikuti bobot -> perbedaan antar kategori tidak
 * hilang saat dijumlahkan lintas kelurahan.
 */
function distributeByWeights(sum: number, baseWeights: number[]) {
   const q = baseWeights.length
   if (sum <= 0) return new Array(q).fill(0)

   // jitter kecil (0.9 - 1.1) agar nilai per kelurahan tidak seragam
   const w = baseWeights.map((b) => b * (0.9 + Math.random() * 0.2))
   const totalW = w.reduce((a, b) => a + b, 0)

   const raw = w.map((x) => (x / totalW) * sum)
   const floored = raw.map((r) => Math.floor(r))
   let remainder = sum - floored.reduce((a, b) => a + b, 0)

   // sisa pembulatan diberikan ke kategori dengan pecahan terbesar
   const order = raw
      .map((r, i) => ({ i, frac: r - Math.floor(r) }))
      .sort((a, b) => b.frac - a.frac)
   for (let k = 0; k < remainder; k++) {
      floored[order[k % q].i]++
   }

   return floored
}

export default async function funGenerateDataLta({ idProvinsi, idKabkot, idKecamatan }: { idProvinsi: number, idKabkot?: number | null, idKecamatan?: number | null }) {
   const where: any = { idProvinsi }
   if (idKabkot) where.idKabkot = idKabkot
   if (idKecamatan) where.idKecamatan = idKecamatan

   const dataLta = await prisma.leaderTraitAssessmentFix.findMany({
      where,
      select: { id: true, idKelurahan: true, idKabkot: true }
   })

   const idKelurahanList = dataLta.map((v) => v.idKelurahan).filter((v): v is number => v != null)

   const dataAudience = await prisma.audience.findMany({
      where: { idKelurahan: { in: idKelurahanList } },
      select: { idKelurahan: true, valueFilteredMax: true }
   })

   const audienceByKelurahan = _.groupBy(dataAudience, "idKelurahan")

   // kelompokkan per kabupaten agar bentuk radar tiap daerah berbeda
   const byKabkot = _.groupBy(dataLta, (v) => v.idKabkot)

   for (const kab of Object.keys(byKabkot)) {
      // pemetaan bobot ke kategori DIACAK PER KABUPATEN (konsisten antar kelurahan di dalamnya)
      const weights = shuffle(BASE_WEIGHTS)

      for (const row of byKabkot[kab]) {
         const totalMax = _.sumBy(audienceByKelurahan[String(row.idKelurahan)] || [], 'valueFilteredMax')
         const [pekerjaKeras, cerdas, jujur, merakyat, tegas, berpengalamanMemimpin, berprestasi, latarBelakangMiliter, agamis] = distributeByWeights(totalMax, weights)

         await prisma.leaderTraitAssessmentFix.update({
            where: { id: row.id },
            data: { pekerjaKeras, cerdas, jujur, merakyat, tegas, berpengalamanMemimpin, berprestasi, latarBelakangMiliter, agamis }
         })
      }
   }

   return {
      success: true,
      message: 'Sukses',
      processed: dataLta.length
   }
}
