"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { InfoIcon, AlertTriangle, CheckCircle, Shuffle } from "lucide-react"
import { getSubtestQuestions } from "@/lib/mock-questions"

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

  useEffect(() => {
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
      generateBuiltInQuestions(parsedSession, shouldRandomize).then(() => {
        router.push("/exam")
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
  }, [])

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

  // Add a function to generate built-in questions
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
        let questions = getSubtestQuestions(subtest, count)

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
          let questions = getSubtestQuestions(subtest, subtestInfo[subtest])

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
      return false
    }
  }

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
        if (!apiKeyExists) {
          throw new Error("API key tidak ditemukan. Silakan masukkan API key ChatGPT di halaman instruksi.")
        }

        // Simulate generating questions one by one
        for (let i = 1; i <= count; i++) {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 200))

          // Update progress
          setProgress(Math.round((i / count) * 100))
        }

        // Store mock questions for now
        let questions = getSubtestQuestions(subtest, count)

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
          if (!apiKeyExists) {
            throw new Error("API key tidak ditemukan. Silakan masukkan API key ChatGPT di halaman instruksi.")
          }

          // Simulate generating questions one by one
          for (let i = 1; i <= subtestInfo[subtest]; i++) {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 200))

            // Update progress
            questionsGenerated++
            totalProgress = Math.round((questionsGenerated / totalQuestions) * 100)
            setProgress(totalProgress)
          }

          // Store mock questions for now
          let questions = getSubtestQuestions(subtest, subtestInfo[subtest])

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
