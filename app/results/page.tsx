"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { mockEvaluations } from "@/lib/mock-evaluations"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Pagination } from "@/components/ui/pagination"

export default function ResultsPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [error, setError] = useState<string | null>(null)
  const [useAI, setUseAI] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [questionsPerPage] = useState(5)
  const [paginatedQuestions, setPaginatedQuestions] = useState<any[]>([])

  useEffect(() => {
    const savedSession = localStorage.getItem("tryoutSession")
    if (!savedSession) {
      router.push("/instructions")
      return
    }

    const parsedSession = JSON.parse(savedSession)

    // Check if session is submitted
    if (!parsedSession.submitted) {
      router.push("/confirm")
      return
    }

    setSession(parsedSession)

    // Check if using AI
    const useAIQuestions = localStorage.getItem("useAIQuestions") === "true"
    setUseAI(useAIQuestions)

    try {
      // In a real app with AI, we would evaluate answers here
      // For this demo, we'll calculate results based on stored questions and answers

      // Initialize results structure
      const evaluationResults = {
        totalScore: 0,
        subtests: {} as Record<string, { score: number; total: number }>,
        questions: [] as any[],
      }

      // Process each subtest
      let totalCorrect = 0
      let totalQuestions = 0

      for (const subtest of Object.keys(parsedSession.subtes)) {
        const subtestAnswers = parsedSession.subtes[subtest].soalJawaban || {}
        const questionsJson = localStorage.getItem(`questions_${subtest}`)

        if (!questionsJson) {
          throw new Error(`Soal untuk ${subtest} tidak ditemukan`)
        }

        const questions = JSON.parse(questionsJson)
        const subtestTotal = questions.length
        let subtestCorrect = 0

        // Check each answer
        for (let i = 0; i < subtestTotal; i++) {
          const question = questions[i]
          const userAnswer = subtestAnswers[question.id]

          if (question) {
            // Add to questions array for detailed view
            evaluationResults.questions.push({
              id: question.id,
              text: question.text,
              options: question.options,
              userAnswer: userAnswer || "",
              correctAnswer: question.correctAnswer,
              correct: userAnswer === question.correctAnswer,
              explanation: question.explanation || "Tidak ada penjelasan tersedia.",
              subtest: subtest,
            })

            // Count correct answers
            if (userAnswer === question.correctAnswer) {
              subtestCorrect++
              totalCorrect++
            }
          }

          totalQuestions++
        }

        // Add subtest results
        evaluationResults.subtests[subtest] = {
          score: subtestCorrect,
          total: subtestTotal,
        }
      }

      // Set total score
      evaluationResults.totalScore = totalCorrect

      // Set results
      setResults(evaluationResults)

      // Set initial paginated questions
      updatePaginatedQuestions(evaluationResults.questions, 1, questionsPerPage)
    } catch (err: any) {
      console.error("Error evaluating answers:", err)
      setError(err.message || "Terjadi kesalahan saat mengevaluasi jawaban.")

      // Fallback to mock evaluations
      setResults(mockEvaluations)
      updatePaginatedQuestions(mockEvaluations.questions, 1, questionsPerPage)
    }

    setLoading(false)
  }, [])

  // Update paginated questions when page changes
  const updatePaginatedQuestions = (allQuestions: any[], page: number, perPage: number) => {
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    setPaginatedQuestions(allQuestions.slice(startIndex, endIndex))
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (results && results.questions) {
      updatePaginatedQuestions(results.questions, page, questionsPerPage)
    }
  }

  const handleRetry = () => {
    // Clear session and start a new one
    localStorage.removeItem("tryoutSession")
    localStorage.removeItem("flaggedQuestions")
    localStorage.removeItem("questionsGenerated")

    // Clear all questions
    const subtests = [
      "Penalaran Umum",
      "Pengetahuan dan Pemahaman Umum",
      "Kemampuan Memahami Bacaan dan Menulis",
      "Pengetahuan Kuantitatif",
      "Literasi dalam Bahasa Indonesia",
      "Literasi dalam Bahasa Inggris",
      "Penalaran Matematika",
    ]

    subtests.forEach((subtest) => {
      localStorage.removeItem(`questions_${subtest}`)
    })

    // Navigate to instructions page
    router.push("/instructions")
  }

  const generateAnalysis = () => {
    if (!results) return null

    // Convert subtest scores to data for chart
    const chartData = Object.keys(results.subtests).map((subtest) => ({
      name: subtest.split(" ")[0], // Use first word of subtest name for brevity
      score: (results.subtests[subtest].score / results.subtests[subtest].total) * 100,
    }))

    // Find strengths and weaknesses
    const subtestScores = Object.keys(results.subtests).map((subtest) => ({
      name: subtest,
      percentage: (results.subtests[subtest].score / results.subtests[subtest].total) * 100,
    }))

    const strengths = [...subtestScores].sort((a, b) => b.percentage - a.percentage).slice(0, 2)
    const weaknesses = [...subtestScores].sort((a, b) => a.percentage - b.percentage).slice(0, 2)

    return {
      chartData,
      strengths,
      weaknesses,
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-center text-gray-500">
                Sedang mengevaluasi jawaban Anda...
                <br />
                <span className="text-sm">Ini mungkin memerlukan waktu beberapa saat.</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <XCircle className="h-12 w-12 text-red-500" />
              <p className="text-center text-gray-500">
                Terjadi kesalahan saat mengevaluasi jawaban Anda.
                <br />
                <span className="text-sm">Menggunakan data evaluasi cadangan.</span>
              </p>
              <Button onClick={handleRetry}>Coba Lagi</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <XCircle className="h-12 w-12 text-red-500" />
              <p className="text-center text-gray-500">
                Terjadi kesalahan saat mengevaluasi jawaban Anda.
                <br />
                <span className="text-sm">Silakan coba lagi nanti.</span>
              </p>
              <Button onClick={handleRetry}>Coba Lagi</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Calculate total pages for pagination
  const totalPages = Math.ceil(results.questions.length / questionsPerPage)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Hasil Simulasi UTBK 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="overview">Ringkasan</TabsTrigger>
              <TabsTrigger value="subtests">Per Subtes</TabsTrigger>
              <TabsTrigger value="questions">Detail Soal</TabsTrigger>
              <TabsTrigger value="analysis">Analisis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Skor Total: {results.totalScore}</h2>
                <p className="text-gray-500">Dari total 160 soal</p>
              </div>

              <div className="grid gap-6">
                {Object.keys(results.subtests).map((subtest) => (
                  <div key={subtest} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{subtest}</span>
                      <span className="font-semibold">
                        {results.subtests[subtest].score} / {results.subtests[subtest].total}
                      </span>
                    </div>
                    <Progress
                      value={(results.subtests[subtest].score / results.subtests[subtest].total) * 100}
                      className="h-2 bg-gray-100"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button onClick={handleRetry} className="bg-blue-600 hover:bg-blue-700">
                  Coba Ulang
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="subtests" className="space-y-6">
              <div className="grid gap-6">
                {Object.keys(results.subtests).map((subtest) => (
                  <Card key={subtest}>
                    <CardHeader>
                      <CardTitle>{subtest}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Skor</span>
                          <span className="font-bold text-xl">
                            {results.subtests[subtest].score} / {results.subtests[subtest].total}
                          </span>
                        </div>
                        <Progress
                          value={(results.subtests[subtest].score / results.subtests[subtest].total) * 100}
                          className="h-2 bg-gray-100"
                        />
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
                            <span className="text-sm text-gray-500">Benar</span>
                            <span className="font-bold">{results.subtests[subtest].score}</span>
                          </div>
                          <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
                            <XCircle className="h-6 w-6 text-red-500 mb-2" />
                            <span className="text-sm text-gray-500">Salah</span>
                            <span className="font-bold">
                              {results.subtests[subtest].total - results.subtests[subtest].score}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-6">
              <div className="grid gap-6">
                {paginatedQuestions.map((question: any) => (
                  <Card key={question.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {question.correct ? (
                          <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="space-y-4 w-full">
                          <div>
                            <h3 className="font-semibold mb-2">{question.text}</h3>
                            <div className="grid gap-2">
                              {question.options.map((option: any) => (
                                <div
                                  key={option.id}
                                  className={`p-3 rounded-md border ${
                                    option.id === question.correctAnswer
                                      ? "bg-green-50 border-green-200"
                                      : option.id === question.userAnswer && !question.correct
                                        ? "bg-red-50 border-red-200"
                                        : ""
                                  }`}
                                >
                                  <span className="font-semibold mr-2">{option.id}.</span>
                                  {option.text}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="font-semibold mb-2">Penjelasan:</p>
                            <p>{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analisis Performa</CardTitle>
                </CardHeader>
                <CardContent>
                  {results && (
                    <div className="space-y-8">
                      <div className="h-64">
                        <h3 className="font-semibold mb-4">Grafik Performa per Subtes (%)</h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={generateAnalysis()?.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, "Skor"]} />
                            <Bar dataKey="score" fill="#2563eb" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Kekuatan</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {generateAnalysis()?.strengths.map((strength) => (
                            <li key={strength.name}>
                              {strength.name} ({strength.percentage.toFixed(1)}% benar)
                            </li>
                          ))}
                          <li>Konsistensi dalam menjawab soal-soal yang membutuhkan analisis</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Area Pengembangan</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {generateAnalysis()?.weaknesses.map((weakness) => (
                            <li key={weakness.name}>
                              {weakness.name} (hanya {weakness.percentage.toFixed(1)}% benar)
                            </li>
                          ))}
                          <li>Manajemen waktu perlu ditingkatkan pada subtes dengan bacaan panjang</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Rekomendasi</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Fokus latihan pada {generateAnalysis()?.weaknesses[0].name}</li>
                          <li>Tingkatkan kecepatan membaca dan analisis untuk subtes dengan teks panjang</li>
                          <li>Latih kemampuan penalaran logis pada soal-soal yang membutuhkan analisis mendalam</li>
                          <li>Gunakan mode Latihan Mini untuk fokus pada area yang perlu ditingkatkan</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
