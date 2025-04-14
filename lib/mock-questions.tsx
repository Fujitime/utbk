// This file contains built-in questions for the UTBK simulation
// These questions will be used when AI generation is disabled or fails

import { penalaranUmumQuestions } from "./questions/penalaran-umum"
import { pengetahuanPemahamanUmumQuestions } from "./questions/pengetahuan-pemahaman-umum"
import { kemampuanMemahamiBacaanQuestions } from "./questions/kemampuan-memahami-bacaan"
import { pengetahuanKuantitatifQuestions } from "./questions/pengetahuan-kuantitatif"
import { literasiBahasaIndonesiaQuestions } from "./questions/literasi-bahasa-indonesia"
import { literasiBahasaInggrisQuestions } from "./questions/literasi-bahasa-inggris"
import { penalaranMatematikaQuestions } from "./questions/penalaran-matematika"

export const mockQuestions: Record<string, any[]> = {
  "Penalaran Umum": penalaranUmumQuestions,
  "Pengetahuan dan Pemahaman Umum": pengetahuanPemahamanUmumQuestions,
  "Kemampuan Memahami Bacaan dan Menulis": kemampuanMemahamiBacaanQuestions,
  "Pengetahuan Kuantitatif": pengetahuanKuantitatifQuestions,
  "Literasi dalam Bahasa Indonesia": literasiBahasaIndonesiaQuestions,
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
    }))
  }

  // Otherwise, return all available questions
  return availableQuestions.map((q, index) => ({
    ...q,
    id: index + 1, // Ensure IDs are sequential starting from 1
  }))
}
