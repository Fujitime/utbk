// This file contains built-in questions for the UTBK simulation
// These questions will be used when AI generation is disabled or fails

import { penalaranUmumQuestions } from "./questions/penalaran-umum"
import { pengetahuanPemahamanUmumQuestions } from "./questions/pengetahuan-pemahaman-umum"
import { kemampuanMemahamiBacaanQuestions } from "./questions/kemampuan-memahami-bacaan"
import { pengetahuanKuantitatifQuestions } from "./questions/pengetahuan-kuantitatif"
import { literasiBahasaIndonesiaQuestions } from "./questions/literasi-bahasa-indonesia"
import { literasiBahasaInggrisQuestions } from "./questions/literasi-bahasa-inggris"
import { penalaranMatematikaQuestions } from "./questions/penalaran-matematika"

// Enhanced questions with images, diagrams, and different question types
const enhancedQuestions = {
  "Penalaran Umum": [
    {
      id: 1,
      text: "Perhatikan pola berikut. Manakah yang melanjutkan pola dengan benar?",
      type: "single",
      image: "/images/questions/pattern-sequence.png",
      options: [
        { id: "A", text: "Gambar A" },
        { id: "B", text: "Gambar B" },
        { id: "C", text: "Gambar C" },
        { id: "D", text: "Gambar D" },
      ],
      correctAnswer: "C",
      explanation:
        "Pola ini menunjukkan rotasi bentuk segitiga sebesar 90 derajat searah jarum jam pada setiap langkah.",
    },
    {
      id: 2,
      text: "Perhatikan diagram Venn berikut yang menunjukkan hubungan antara Mamalia (M), Hewan Berkaki Empat (E), dan Hewan Pemakan Daging (D). Manakah pernyataan yang BENAR berdasarkan diagram tersebut?",
      type: "single",
      diagram: "/images/questions/venn-diagram-animals.png",
      options: [
        { id: "A", text: "Semua mamalia adalah hewan berkaki empat" },
        { id: "B", text: "Semua hewan pemakan daging adalah mamalia" },
        { id: "C", text: "Ada hewan berkaki empat yang bukan mamalia" },
        { id: "D", text: "Tidak ada mamalia yang pemakan daging" },
      ],
      correctAnswer: "C",
      explanation:
        "Diagram menunjukkan bahwa ada area E yang berada di luar M, yang berarti ada hewan berkaki empat yang bukan mamalia.",
    },
    {
      id: 3,
      text: "Perhatikan denah berikut. Jika Andi berada di titik A dan ingin pergi ke titik B dengan jarak terpendek, berapa banyak rute berbeda yang dapat ia pilih?",
      type: "numeric",
      map: "/images/questions/grid-map.png",
      correctAnswer: "6",
      explanation:
        "Untuk mencapai titik B dari titik A dengan jarak terpendek, Andi harus bergerak 2 langkah ke kanan dan 3 langkah ke atas. Jumlah rute berbeda adalah kombinasi dari 5 langkah dengan 2 langkah ke kanan, yaitu C(5,2) = 10 cara.",
    },
  ],
  "Pengetahuan Kuantitatif": [
    {
      id: 1,
      text: "Perhatikan grafik fungsi $f(x) = x^2 - 4x + 3$ berikut. Tentukan nilai minimum fungsi tersebut.",
      type: "single",
      diagram: "/images/questions/parabola-graph.png",
      options: [
        { id: "A", text: "-1" },
        { id: "B", text: "0" },
        { id: "C", text: "1" },
        { id: "D", text: "2" },
      ],
      correctAnswer: "A",
      explanation:
        "Nilai minimum fungsi kuadrat $f(x) = x^2 - 4x + 3$ terjadi pada $x = \\frac{4}{2} = 2$. Nilai minimumnya adalah $f(2) = 2^2 - 4(2) + 3 = 4 - 8 + 3 = -1$.",
    },
    {
      id: 2,
      text: "Perhatikan data pada tabel berikut yang menunjukkan hasil penjualan produk selama 5 hari. Berapakah rata-rata penjualan harian?",
      type: "numeric",
      diagram: "/images/questions/sales-table.png",
      correctAnswer: "85",
      explanation: "Rata-rata penjualan = (75 + 90 + 82 + 95 + 83) / 5 = 425 / 5 = 85.",
    },
  ],
  "Literasi dalam Bahasa Indonesia": [
    {
      id: 1,
      text: "Perhatikan infografis berikut tentang dampak polusi plastik. Berdasarkan infografis tersebut, manakah kesimpulan yang PALING tepat?",
      type: "single",
      image: "/images/questions/plastic-pollution.png",
      options: [
        { id: "A", text: "Polusi plastik hanya berdampak pada ekosistem laut" },
        { id: "B", text: "Penggunaan plastik sekali pakai merupakan penyebab utama polusi plastik" },
        { id: "C", text: "Daur ulang adalah satu-satunya solusi untuk mengatasi polusi plastik" },
        { id: "D", text: "Polusi plastik tidak memiliki dampak signifikan terhadap kesehatan manusia" },
      ],
      correctAnswer: "B",
      explanation:
        "Infografis menunjukkan bahwa penggunaan plastik sekali pakai merupakan penyebab utama polusi plastik, dengan data yang mendukung pernyataan tersebut.",
    },
  ],
  "Kemampuan Memahami Bacaan dan Menulis": [
    {
      id: 1,
      text: "Bacalah artikel berikut tentang perubahan iklim. Berdasarkan artikel tersebut, manakah dari pernyataan berikut yang BENAR? (Pilih semua yang benar)",
      type: "multiple",
      image: "/images/questions/climate-change-article.png",
      options: [
        { id: "A", text: "Perubahan iklim hanya disebabkan oleh aktivitas manusia" },
        { id: "B", text: "Kenaikan suhu global telah mencapai 1°C sejak era pra-industri" },
        { id: "C", text: "Pengurangan emisi karbon adalah strategi utama untuk mengatasi perubahan iklim" },
        { id: "D", text: "Dampak perubahan iklim sudah tidak dapat dibalikkan" },
      ],
      correctAnswer: ["B", "C"],
      explanation:
        "Artikel menyebutkan bahwa kenaikan suhu global telah mencapai 1°C sejak era pra-industri dan pengurangan emisi karbon adalah strategi utama untuk mengatasi perubahan iklim.",
    },
  ],
}

// Merge enhanced questions with existing questions
export const mockQuestions: Record<string, any[]> = {
  "Penalaran Umum": [...enhancedQuestions["Penalaran Umum"], ...penalaranUmumQuestions],
  "Pengetahuan dan Pemahaman Umum": pengetahuanPemahamanUmumQuestions,
  "Kemampuan Memahami Bacaan dan Menulis": [
    ...enhancedQuestions["Kemampuan Memahami Bacaan dan Menulis"],
    ...kemampuanMemahamiBacaanQuestions,
  ],
  "Pengetahuan Kuantitatif": [...enhancedQuestions["Pengetahuan Kuantitatif"], ...pengetahuanKuantitatifQuestions],
  "Literasi dalam Bahasa Indonesia": [
    ...enhancedQuestions["Literasi dalam Bahasa Indonesia"],
    ...literasiBahasaIndonesiaQuestions,
  ],
  "Literasi dalam Bahasa Inggris": literasiBahasaInggrisQuestions,
  "Penalaran Matematika": penalaranMatematikaQuestions,
}

// Function to get a complete set of questions for a subtest
export function getSubtestQuestions(subtest: string, count: number): any[] {
  const availableQuestions = mockQuestions[subtest] || []

  // If we have enough questions, return the requested count
  if (availableQuestions.length >= count) {
    return availableQuestions.slice(0, count).map((q, index) => ({
      ...q,
      id: index + 1, // Ensure IDs are sequential starting from 1
      // Set default type if not specified
      type: q.type || "single",
    }))
  }

  // Otherwise, return all available questions
  return availableQuestions.map((q, index) => ({
    ...q,
    id: index + 1, // Ensure IDs are sequential starting from 1
    // Set default type if not specified
    type: q.type || "single",
  }))
}
