"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { InfoIcon, AlertTriangle, CheckCircle } from "lucide-react"
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

    // Load session from localStorage
    const savedSession = localStorage.getItem("tryoutSession")
    if (!savedSession) {
      router.push("/instructions")
      return
    }

    const parsedSession = JSON.parse(savedSession)
    setSession(parsedSession)

    // Check if questions are already generated
    const questionsGenerated = localStorage.getItem("questionsGenerated")
    if (questionsGenerated === "true") {
      setIsComplete(true)
      setProgress(100)

      // Count available questions for each subtest
      countAvailableQuestions()
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
      // Get all subtests
      const subtests = Object.keys(subtestInfo)
      let totalProgress = 0
      const totalQuestions = subtests.reduce((sum, subtest) => sum + subtestInfo[subtest], 0)
      let questionsGenerated = 0
      const questionCounts: Record<string, number> = {}

      // Generate questions for each subtest
      for (const subtest of subtests) {
        setCurrentSubtest(subtest)

        // If using built-in questions or AI is disabled
        if (!useAI || questionMode === "builtin") {
          // Get built-in questions for this subtest
          // Don't force a specific count - use what's available
          const questions = getSubtestQuestions(subtest, 5)

          // Store questions in localStorage
          localStorage.setItem(`questions_${subtest}`, JSON.stringify(questions))

          // Store the count
          questionCounts[subtest] = questions.length

          // Update progress based on the actual number of questions
          questionsGenerated += questions.length
          totalProgress = Math.round((questionsGenerated / totalQuestions) * 100)
          setProgress(totalProgress)

          // Simulate some delay to show progress
          await new Promise((resolve) => setTimeout(resolve, 500))
        } else {
          // Simulate AI question generation with a delay
          // In a real implementation, this would make API calls to generate questions

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
          const questions = getSubtestQuestions(subtest, 5)
          localStorage.setItem(`questions_${subtest}`, JSON.stringify(questions))

          // Store the count
          questionCounts[subtest] = questions.length
        }
      }

      // Store available question counts
      setAvailableQuestionCounts(questionCounts)
      localStorage.setItem("availableQuestionCounts", JSON.stringify(questionCounts))

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
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Persiapan Soal Ujian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {!isComplete && (
              <>
                <Alert className="bg-blue-50 dark:bg-blue-950">
                  <InfoIcon className="h-4 w-4" />
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
                  <Progress value={progress} className="h-2" />
                  {isGenerating && currentSubtest && (
                    <p className="text-sm text-gray-500">Menyiapkan soal untuk: {currentSubtest}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {!isGenerating ? (
                    <>
                      <Button onClick={generateAllQuestions} className="bg-blue-600 hover:bg-blue-700">
                        Mulai Persiapan Soal
                      </Button>
                      {error && (
                        <Button variant="outline" onClick={handleUseBuiltInQuestions}>
                          Gunakan Soal Bawaan
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button disabled>
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

                <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700">
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
