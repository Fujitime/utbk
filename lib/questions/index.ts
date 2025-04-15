import { penalaranUmumQuestions } from "./penalaran-umum"
import { pengetahuanPemahamanUmumQuestions } from "./pengetahuan-pemahaman-umum"
import { kemampuanMemahamiBacaanQuestions } from "./kemampuan-memahami-bacaan"
import { pengetahuanKuantitatifQuestions } from "./pengetahuan-kuantitatif"
import { literasiBahasaIndonesiaQuestions } from "./literasi-bahasa-indonesia"
import { literasiBahasaInggrisQuestions } from "./literasi-bahasa-inggris"
import { penalaranMatematikaQuestions } from "./penalaran-matematika"

export const questionBank: Record<string, any[]> = {
  "Penalaran Umum": penalaranUmumQuestions,
  "Pengetahuan dan Pemahaman Umum": pengetahuanPemahamanUmumQuestions,
  "Kemampuan Memahami Bacaan dan Menulis": kemampuanMemahamiBacaanQuestions,
  "Pengetahuan Kuantitatif": pengetahuanKuantitatifQuestions,
  "Literasi dalam Bahasa Indonesia": literasiBahasaIndonesiaQuestions,
  "Literasi dalam Bahasa Inggris": literasiBahasaInggrisQuestions,
  "Penalaran Matematika": penalaranMatematikaQuestions,
}
