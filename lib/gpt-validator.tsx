/**
 * GPT Validator - Validates and processes GPT responses
 * This module handles validation, error recovery, and formatting of GPT outputs
 */

// Define the expected structure for a question
export interface ValidatedQuestion {
  id: number
  text: string
  options: {
    id: string
    text: string
  }[]
  correctAnswer: string
  explanation: string
  subtest: string
}

// Define the expected structure for an evaluation
export interface ValidatedEvaluation {
  correct: boolean
  explanation: string
}

/**
 * Validates a GPT-generated question and ensures it has the correct format
 * @param rawResponse The raw response from GPT
 * @param subtest The subtest this question belongs to
 * @param questionNumber The question number
 * @returns A properly formatted question or null if validation fails
 */
export function validateQuestion(
  rawResponse: string,
  subtest: string,
  questionNumber: number,
): ValidatedQuestion | null {
  try {
    // Try to extract the question components using regex
    const questionMatch = rawResponse.match(/Soal:\s*(.*?)(?=\n\nPilihan:|$)/s)
    const optionsMatch = rawResponse.match(/Pilihan:\s*(.*?)(?=\n\nJawaban yang benar:|$)/s)
    const answerMatch = rawResponse.match(/Jawaban yang benar:\s*([A-E])/)
    const explanationMatch = rawResponse.match(/Penjelasan:\s*(.*?)(?=$)/s)

    if (!questionMatch || !optionsMatch || !answerMatch || !explanationMatch) {
      console.error("Failed to parse GPT response:", rawResponse)
      return null
    }

    const questionText = questionMatch[1].trim()
    const optionsText = optionsMatch[1].trim()
    const correctAnswer = answerMatch[1].trim()
    const explanation = explanationMatch[1].trim()

    // Parse options
    const optionRegex = /([A-E])\.\s*(.*?)(?=\n[A-E]\.|$)/gs
    const options: { id: string; text: string }[] = []
    let match

    while ((match = optionRegex.exec(optionsText)) !== null) {
      options.push({
        id: match[1],
        text: match[2].trim(),
      })
    }

    if (options.length < 4) {
      console.error("Not enough options found:", options)
      return null
    }

    return {
      id: questionNumber,
      text: questionText,
      options,
      correctAnswer,
      explanation,
      subtest,
    }
  } catch (error) {
    console.error("Error validating question:", error)
    return null
  }
}

/**
 * Validates a GPT-generated evaluation and ensures it has the correct format
 * @param rawResponse The raw response from GPT
 * @returns A properly formatted evaluation or a default one if validation fails
 */
export function validateEvaluation(rawResponse: string): ValidatedEvaluation {
  try {
    // Try to extract the evaluation components using regex
    const correctMatch = rawResponse.match(/Penilaian:\s*(Benar|Salah)/i)
    const explanationMatch = rawResponse.match(/Penjelasan:\s*(.*?)(?=$)/s)

    if (!correctMatch || !explanationMatch) {
      console.error("Failed to parse GPT evaluation:", rawResponse)
      return {
        correct: false,
        explanation: "Terjadi kesalahan dalam mengevaluasi jawaban. Silakan coba lagi.",
      }
    }

    const isCorrect = correctMatch[1].toLowerCase() === "benar"
    const explanation = explanationMatch[1].trim()

    return {
      correct: isCorrect,
      explanation,
    }
  } catch (error) {
    console.error("Error validating evaluation:", error)
    return {
      correct: false,
      explanation: "Terjadi kesalahan dalam mengevaluasi jawaban. Silakan coba lagi.",
    }
  }
}

/**
 * Generates a prompt for creating a question based on the subtest
 * @param subtest The subtest to generate a question for
 * @returns A prompt tailored to the specific subtest
 */
export function generateQuestionPrompt(subtest: string): string {
  const basePrompt = `Kamu adalah seorang ahli pembuatan soal UTBK yang telah berpengalaman menulis soal untuk UTBK SNBT. Tugas kamu adalah membuat satu soal pilihan ganda yang benar-benar mencerminkan format dan tingkat kesulitan UTBK SNBT 2025.

Spesifikasi:
- Format: Pilihan Ganda
- Tipe Subtes: ${subtest}
- Standar: UTBK SNBT 2022–2024
- Kriteria Soal:
  - Kompleksitas sedang-tinggi
  - Distraktor logis
  - Validasi logika & kebenaran jawaban

Format output:

Soal: [Tuliskan soal di sini]

Pilihan:
A. [Opsi A]
B. [Opsi B]
C. [Opsi C]
D. [Opsi D]

Jawaban yang benar: [Huruf jawaban]

Penjelasan: [Tuliskan penjelasan yang mendalam dan edukatif]`

  // Add subtest-specific instructions
  switch (subtest) {
    case "Penalaran Umum":
      return `${basePrompt}

Untuk Penalaran Umum, fokus pada:
- Soal logika
- Pola dan deret
- Analogi
- Silogisme
- Penalaran induktif dan deduktif`

    case "Pengetahuan dan Pemahaman Umum":
      return `${basePrompt}

Untuk Pengetahuan dan Pemahaman Umum, fokus pada:
- Pengetahuan sosial, budaya, dan sains
- Isu-isu kontemporer
- Sejarah dan geografi Indonesia
- Wawasan kebangsaan`

    case "Kemampuan Memahami Bacaan dan Menulis":
      return `${basePrompt}

Untuk Kemampuan Memahami Bacaan dan Menulis, fokus pada:
- Pemahaman teks
- Identifikasi ide pokok
- Analisis struktur teks
- Kesimpulan dan inferensi`

    case "Pengetahuan Kuantitatif":
      return `${basePrompt}

Untuk Pengetahuan Kuantitatif, fokus pada:
- Aritmatika dasar
- Aljabar
- Geometri
- Statistika dasar
- Pemecahan masalah matematis`

    case "Literasi dalam Bahasa Indonesia":
      return `${basePrompt}

Untuk Literasi dalam Bahasa Indonesia, fokus pada:
- Pemahaman teks kompleks
- Analisis wacana
- Tata bahasa dan ejaan
- Makna kata dan ungkapan`

    case "Literasi dalam Bahasa Inggris":
      return `${basePrompt}

Untuk Literasi dalam Bahasa Inggris, fokus pada:
- Reading comprehension
- Vocabulary in context
- Grammar and structure
- Inference and conclusion`

    case "Penalaran Matematika":
      return `${basePrompt}

Untuk Penalaran Matematika, fokus pada:
- Pemecahan masalah matematika kompleks
- Penalaran logis-matematis
- Aplikasi konsep matematika
- Analisis data dan pola`

    default:
      return basePrompt
  }
}

/**
 * Generates a prompt for evaluating an answer
 * @param question The question being evaluated
 * @param userAnswer The user's answer
 * @returns A prompt for evaluating the answer
 */
export function generateEvaluationPrompt(question: ValidatedQuestion, userAnswer: string): string {
  return `Kamu adalah pengoreksi soal UTBK SNBT 2025 yang teliti dan akurat. Evaluasi jawaban peserta berikut dengan sangat detail sehingga penilaiannya 100% akurat dan menyerupai penilaian sistem UTBK asli.

Format Input:
Soal: ${question.text}

Pilihan:
${question.options.map((opt) => `${opt.id}. ${opt.text}`).join("\n")}

Jawaban yang benar: ${question.correctAnswer}
Jawaban Peserta: ${userAnswer}

Instruksi:
- Tentukan apakah jawaban peserta benar atau salah.
- Jelaskan dalam 3-4 kalimat mengapa jawaban peserta itu benar atau salah, dengan mengacu pada konsep dan logika yang diujikan.
- Gunakan bahasa yang formal dan akurat.

Format Output:

Penilaian: ${userAnswer === question.correctAnswer ? "Benar" : "Salah"}

Penjelasan: ${
    userAnswer === question.correctAnswer
      ? question.explanation
      : `Jawaban yang benar adalah ${question.correctAnswer}. ${question.explanation}`
  }`
}

/**
 * Creates a fallback question if GPT generation fails
 * @param subtest The subtest
 * @param questionNumber The question number
 * @returns A fallback question
 */
export function createFallbackQuestion(subtest: string, questionNumber: number): ValidatedQuestion {
  return {
    id: questionNumber,
    text: `Soal cadangan untuk ${subtest} (nomor ${questionNumber}). Maaf, terjadi kesalahan dalam menghasilkan soal.`,
    options: [
      { id: "A", text: "Opsi A" },
      { id: "B", text: "Opsi B" },
      { id: "C", text: "Opsi C" },
      { id: "D", text: "Opsi D" },
    ],
    correctAnswer: "A",
    explanation: "Ini adalah soal cadangan karena terjadi kesalahan dalam menghasilkan soal asli.",
    subtest,
  }
}
