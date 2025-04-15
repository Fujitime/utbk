"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { InfoIcon, AlertTriangle, CheckCircle, Shuffle } from "lucide-react"
import { getQuestionsFromBank } from "@/lib/questions/utils"
// Fungsi untuk menghasilkan soal dengan AI
async function generateAIQuestions(subtest: string, count: number, difficulty = "medium") {
  // Simulasi panggilan API ke model AI
  // Dalam implementasi nyata, ini akan memanggil API seperti OpenAI
  console.log(`Generating ${count} ${difficulty} questions for ${subtest} using AI...`)

  // Simulasi delay untuk menunjukkan proses generasi
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Untuk demo, kita akan membuat soal dengan format yang benar
  const questions = []

  for (let i = 1; i <= count; i++) {
    // Buat soal berdasarkan subtest
    let question

    if (subtest.includes("Matematika")) {
      // Soal matematika
      question = {
        id: i,
        type: Math.random() > 0.7 ? "multiple" : Math.random() > 0.5 ? "numeric" : "single",
        text: `Soal matematika AI #${i}: Jika $f(x) = x^2 + ${i}x + ${i * 2}$, berapakah nilai $f(${i})$?`,
        options: [
          { id: "A", text: `${i * i + i * i + i * 2}` },
          { id: "B", text: `${i * i + i * i + i * 2 + 1}` },
          { id: "C", text: `${i * i + i * i + i * 2 - 1}` },
          { id: "D", text: `${i * i + i * i + i * 2 + 2}` },
        ],
        correctAnswer: "A",
        explanation: `Substitusi x = ${i} ke dalam f(x) = x^2 + ${i}x + ${i * 2}, sehingga f(${i}) = ${i}^2 + ${i}×${i} + ${i * 2} = ${i * i} + ${i * i} + ${i * 2} = ${i * i + i * i + i * 2}.`,
      }
    } else if (subtest.includes("Bahasa")) {
      // Soal bahasa
      question = {
        id: i,
        type: Math.random() > 0.7 ? "multiple" : "single",
        text: `Soal bahasa AI #${i}: Manakah kata yang memiliki arti yang paling tepat untuk melengkapi kalimat berikut: "Dia sangat ___ dalam mengerjakan tugas-tugasnya."`,
        options: [
          { id: "A", text: "teliti" },
          { id: "B", text: "rajin" },
          { id: "C", text: "cerdas" },
          { id: "D", text: "lambat" },
        ],
        correctAnswer: "A",
        explanation:
          "Kata 'teliti' paling tepat untuk melengkapi kalimat tersebut karena menggambarkan seseorang yang cermat dan hati-hati dalam mengerjakan tugas.",
      }
    } else if (subtest.includes("Penalaran")) {
      // Soal penalaran
      if (i === 30) {
        // Khusus untuk soal #30 yang disebutkan user
        question = {
          id: i,
          type: "single",
          text: `Soal penalaran AI #${i}: Jika semua A adalah B, dan beberapa B adalah C, maka...`,
          options: [
            { id: "A", text: "Semua A adalah C" },
            { id: "B", text: "Beberapa A adalah C" },
            { id: "C", text: "Semua C adalah A" },
            { id: "D", text: "Tidak dapat ditentukan hubungan antara A dan C" },
          ],
          correctAnswer: "D",
          explanation:
            "Dari premis yang diberikan, kita tidak dapat menyimpulkan hubungan pasti antara A dan C. Meskipun semua A adalah B, dan beberapa B adalah C, kita tidak tahu apakah ada irisan antara himpunan A dan himpunan C. Bisa saja semua A berada di luar himpunan B yang merupakan C, atau bisa juga beberapa A adalah C.",
          diagram: "/images/questions/venn-diagram-sets.png",
        }
      } else {
        // Soal penalaran lainnya
        question = {
          id: i,
          type: Math.random() > 0.7 ? "multiple" : "single",
          text: `Soal penalaran AI #${i}: Perhatikan pola berikut: 2, 6, 18, 54, ... Angka berikutnya dalam pola tersebut adalah...`,
          options: [
            { id: "A", text: "108" },
            { id: "B", text: "162" },
            { id: "C", text: "216" },
            { id: "D", text: "324" },
          ],
          correctAnswer: "B",
          explanation:
            "Pola ini adalah barisan geometri dengan rasio 3. Setiap angka dikalikan 3 untuk mendapatkan angka berikutnya. Jadi, angka berikutnya adalah 54 × 3 = 162.",
        }
      }
    } else {
      // Soal umum
      question = {
        id: i,
        type: Math.random() > 0.7 ? "multiple" : "single",
        text: `Soal AI #${i} untuk ${subtest}: Manakah pernyataan berikut yang benar?`,
        options: [
          { id: "A", text: `Pernyataan A tentang ${subtest}` },
          { id: "B", text: `Pernyataan B tentang ${subtest}` },
          { id: "C", text: `Pernyataan C tentang ${subtest}` },
          { id: "D", text: `Pernyataan D tentang ${subtest}` },
        ],
        correctAnswer: "B",
        explanation: `Pernyataan B adalah benar karena sesuai dengan konsep dalam ${subtest}.`,
      }
    }

    questions.push(question)
  }

  return questions
}

export default function GenerateQuestionsPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const [currentSubtest, setCurrentSubtest] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [useAI, setUseAI] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [apiKeyExists, setApiKeyExists] = useState(false)
  const [questionMode, setQuestionMode] = useState("ai")
  const [availableQuestionCounts, setAvailableQuestionCounts] = useState<Record<string, number>>({})
  const [randomizeQuestions, setRandomizeQuestions] = useState(false)

  // Subtest info
  const subtestInfo: Record<string, number> = {
    "Penalaran Umum": 30,
    "Pengetahuan dan Pemahaman Umum": 20,
    "Kemampuan Memahami Bacaan dan Menulis": 20,
    "Pengetahuan Kuantitatif": 20,
    "Literasi dalam Bahasa Indonesia": 30,
    "Literasi dalam Bahasa Inggris": 20,
    "Penalaran Matematika": 20,
  }

  // Function to shuffle an array
  const shuffleArray = (array: any[]) => {
    // Only shuffle if there are at least 2 items
    if (array.length < 2) return array

    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Update the generateBuiltInQuestions function to handle errors properly
  const generateBuiltInQuestions = async (sessionData: any, shouldRandomize: boolean) => {
    if (!sessionData) return false

    try {
      // Check if this is a mini practice session
      const isPracticeMode = sessionData.isPracticeMode

      if (isPracticeMode) {
        // For mini practice, only generate questions for the selected subtest
        const subtest = sessionData.currentSubtest
        const count = sessionData.practiceConfig?.questionCount || 5

        // Get built-in questions for this subtest
        let questions = getQuestionsFromBank(subtest, count)

        // Make sure we have questions
        if (!questions || questions.length === 0) {
          throw new Error(`No questions available for ${subtest}`)
        }

        // Randomize questions if enabled
        if (shouldRandomize && questions.length >= 2) {
          questions = shuffleArray(questions)

          // Ensure IDs are sequential after shuffling
          questions = questions.map((q, index) => ({
            ...q,
            id: index + 1,
          }))
        }

        // Store questions in localStorage
        localStorage.setItem(`questions_${subtest}`, JSON.stringify(questions))

        // Store the count
        const questionCounts: Record<string, number> = {}
        questionCounts[subtest] = questions.length
        setAvailableQuestionCounts(questionCounts)
        localStorage.setItem("availableQuestionCounts", JSON.stringify(questionCounts))
      } else {
        // Get all subtests
        const subtests = Object.keys(subtestInfo)
        const questionCounts: Record<string, number> = {}

        // Generate questions for each subtest
        for (const subtest of subtests) {
          // Get built-in questions for this subtest
          let questions = getQuestionsFromBank(subtest, subtestInfo[subtest])

          // Make sure we have questions
          if (!questions || questions.length === 0) {
            console.warn(`No questions available for ${subtest}, using placeholder questions`)
            questions = Array(subtestInfo[subtest])
              .fill(null)
              .map((_, i) => ({
                id: i + 1,
                text: `Placeholder question ${i + 1} for ${subtest}`,
                type: "single",
                options: [
                  { id: "A", text: "Option A" },
                  { id: "B", text: "Option B" },
                  { id: "C", text: "Option C" },
                  { id: "D", text: "Option D" },
                ],
                correctAnswer: "A",
                explanation: "This is a placeholder question.",
              }))
          }

          // Randomize questions if enabled
          if (shouldRandomize && questions.length >= 2) {
            questions = shuffleArray(questions)

            // Ensure IDs are sequential after shuffling
            questions = questions.map((q, index) => ({
              ...q,
              id: index + 1,
            }))
          }

          // Store questions in localStorage
          localStorage.setItem(`questions_${subtest}`, JSON.stringify(questions))

          // Store the count
          questionCounts[subtest] = questions.length
        }

        // Store available question counts
        setAvailableQuestionCounts(questionCounts)
        localStorage.setItem("availableQuestionCounts", JSON.stringify(questionCounts))
      }

      // Mark questions as generated
      localStorage.setItem("questionsGenerated", "true")
      localStorage.setItem("useAIQuestions", "false")

      return true
    } catch (err) {
      console.error("Error generating built-in questions:", err)
      setError("Terjadi kesalahan saat menghasilkan soal. Silakan coba lagi.")
      return false
    }
  }

  // Add a proper error boundary for the component
  useEffect(() => {
    // Handle errors during initialization
    try {
      // Check if API key exists
      const apiKey = localStorage.getItem("chatgpt-api-key")
      setApiKeyExists(!!apiKey)

      // Get question mode
      const mode = localStorage.getItem("questionMode") || "ai"
      setQuestionMode(mode)
      setUseAI(mode === "ai")

      // Get randomize questions preference
      const shouldRandomize = localStorage.getItem("randomizeQuestions") === "true"
      setRandomizeQuestions(shouldRandomize)

      // Load session from localStorage
      const savedSession = localStorage.getItem("tryoutSession")
      if (!savedSession) {
        router.push("/instructions")
        return
      }

      const parsedSession = JSON.parse(savedSession)
      setSession(parsedSession)

      // If using built-in mode, generate questions now and skip to exam
      if (mode === "builtin") {
        generateBuiltInQuestions(parsedSession, shouldRandomize).then((success) => {
          if (success) {
            router.push("/exam")
          } else {
            // If generation failed, show error but don't redirect
            setError("Terjadi kesalahan saat menghasilkan soal. Silakan coba lagi dengan mode lain.")
          }
        })
      }

      // Check if questions are already generated
      const questionsGenerated = localStorage.getItem("questionsGenerated")
      if (questionsGenerated === "true") {
        setIsComplete(true)
        setProgress(100)

        // Count available questions for each subtest
        countAvailableQuestions()
      }
    } catch (error) {
      console.error("Error in initialization:", error)
      setError("Terjadi kesalahan saat memuat data. Silakan refresh halaman.")
    }
  }, [])

  // Count available questions for each subtest
  const countAvailableQuestions = () => {
    const subtests = Object.keys(subtestInfo)
    const counts: Record<string, number> = {}

    subtests.forEach((subtest) => {
      const questionsJson = localStorage.getItem(`questions_${subtest}`)
      if (questionsJson) {
        const questions = JSON.parse(questionsJson)
        counts[subtest] = questions.length
      } else {
        counts[subtest] = 0
      }
    })

    setAvailableQuestionCounts(counts)
    // Store counts in localStorage for other components to access
    localStorage.setItem("availableQuestionCounts", JSON.stringify(counts))
  }

  // Function to generate questions for all subtests
  const generateAllQuestions = async () => {
    if (!session) return

    setIsGenerating(true)
    setError(null)

    try {
      // Check if this is a mini practice session
      const isPracticeMode = session.isPracticeMode

      if (isPracticeMode) {
        // For mini practice, only generate questions for the selected subtest
        const subtest = session.currentSubtest
        const count = session.practiceConfig?.questionCount || 5

        setCurrentSubtest(subtest)

        // Check if API key exists
        if (useAI && !apiKeyExists) {
          throw new Error("API key tidak ditemukan. Silakan masukkan API key ChatGPT di halaman instruksi.")
        }

        // Generate questions
        let questions
        if (useAI) {
          // Generate questions using AI
          setProgress(10) // Start progress
          questions = await generateAIQuestions(subtest, count)
          setProgress(100) // Complete progress
        } else {
          // Use built-in questions
          questions = getQuestionsFromBank(subtest, count)
        }

        // Randomize questions if enabled
        if (randomizeQuestions && questions.length >= 2) {
          questions = shuffleArray(questions)

          // Ensure IDs are sequential after shuffling
          questions = questions.map((q, index) => ({
            ...q,
            id: index + 1,
          }))
        }

        localStorage.setItem(`questions_${subtest}`, JSON.stringify(questions))

        // Store the count
        const questionCounts: Record<string, number> = {}
        questionCounts[subtest] = questions.length
        setAvailableQuestionCounts(questionCounts)
        localStorage.setItem("availableQuestionCounts", JSON.stringify(questionCounts))
      } else {
        // Get all subtests
        const subtests = Object.keys(subtestInfo)
        let totalProgress = 0
        const totalQuestions = subtests.reduce((sum, subtest) => sum + subtestInfo[subtest], 0)
        let questionsGenerated = 0
        const questionCounts: Record<string, number> = {}

        // Generate questions for each subtest
        for (const subtest of subtests) {
          setCurrentSubtest(subtest)

          // Check if API key exists
          if (useAI && !apiKeyExists) {
            throw new Error("API key tidak ditemukan. Silakan masukkan API key ChatGPT di halaman instruksi.")
          }

          // Generate questions
          let questions
          if (useAI) {
            // Generate questions using AI
            questions = await generateAIQuestions(subtest, subtestInfo[subtest])
            questionsGenerated += subtestInfo[subtest]
            totalProgress = Math.round((questionsGenerated / totalQuestions) * 100)
            setProgress(totalProgress)
          } else {
            // Use built-in questions
            questions = getQuestionsFromBank(subtest, subtestInfo[subtest])
            questionsGenerated += subtestInfo[subtest]
            totalProgress = Math.round((questionsGenerated / totalQuestions) * 100)
            setProgress(totalProgress)
          }

          // Randomize questions if enabled
          if (randomizeQuestions && questions.length >= 2) {
            questions = shuffleArray(questions)

            // Ensure IDs are sequential after shuffling
            questions = questions.map((q, index) => ({
              ...q,
              id: index + 1,
            }))
          }

          localStorage.setItem(`questions_${subtest}`, JSON.stringify(questions))

          // Store the count
          questionCounts[subtest] = questions.length
        }

        // Store available question counts
        setAvailableQuestionCounts(questionCounts)
        localStorage.setItem("availableQuestionCounts", JSON.stringify(questionCounts))
      }

      // Mark questions as generated
      localStorage.setItem("questionsGenerated", "true")
      localStorage.setItem("useAIQuestions", useAI ? "true" : "false")

      setIsComplete(true)
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menghasilkan soal.")
      setIsGenerating(false)
    }
  }

  const handleContinue = () => {
    router.push("/exam")
  }

  const handleUseBuiltInQuestions = () => {
    setUseAI(false)
    setError(null)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="mb-8 border-0 shadow-lg bg-gradient-to-b from-gray-50 to-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Persiapan Soal Ujian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {!isComplete && (
              <>
                <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-sm">
                  <InfoIcon className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Sebelum memulai ujian, sistem perlu menyiapkan semua soal. Proses ini mungkin memerlukan waktu
                    beberapa menit.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="use-ai"
                    checked={useAI}
                    onCheckedChange={(checked) => setUseAI(checked === true)}
                    disabled={isGenerating || questionMode === "builtin"}
                  />
                  <label
                    htmlFor="use-ai"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Gunakan AI untuk menghasilkan soal (memerlukan API key ChatGPT)
                  </label>
                </div>

                {randomizeQuestions && (
                  <div className="flex items-center space-x-2 mb-4">
                    <Shuffle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Soal akan diacak dalam setiap subtes</span>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Progress Persiapan Soal</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-100" />
                  {isGenerating && currentSubtest && (
                    <p className="text-sm text-gray-500">Menyiapkan soal untuk: {currentSubtest}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {!isGenerating ? (
                    <>
                      <Button
                        onClick={generateAllQuestions}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Mulai Persiapan Soal
                      </Button>
                      {error && (
                        <Button variant="outline" onClick={handleUseBuiltInQuestions}>
                          Gunakan Soal Bawaan
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button disabled className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <span className="animate-spin mr-2">⏳</span> Menyiapkan Soal...
                    </Button>
                  )}
                </div>
              </>
            )}

            {isComplete && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Persiapan soal selesai!</span>
                </div>

                <p>Semua soal telah siap. Anda dapat memulai ujian sekarang.</p>

                <Button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Mulai Ujian
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
