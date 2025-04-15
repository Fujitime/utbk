"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Printer,
  PieChart,
  BarChartIcon,
  LineChart,
  TrendingUp,
  User,
  School,
} from "lucide-react"
import { mockEvaluations } from "@/lib/mock-evaluations"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart as RechartsLineChart,
  Line,
} from "recharts"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import jsPDF from "jspdf"

// Config untuk MathJax
const mathJaxConfig = {
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
}

// Colors for charts
const CHART_COLORS = [
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f97316", // orange-500
  "#10b981", // emerald-500
  "#6366f1", // indigo-500
  "#ef4444", // red-500
]

export default function ResultsPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [error, setError] = useState<string | null>(null)
  const [useAI, setUseAI] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const radarChartRef = useRef<HTMLDivElement>(null)
  const pieChartRef = useRef<HTMLDivElement>(null)
  const lineChartRef = useRef<HTMLDivElement>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [questionsPerPage] = useState(5)
  const [paginatedQuestions, setPaginatedQuestions] = useState<any[]>([])
  const [filteredQuestionsCount, setFilteredQuestionsCount] = useState(0)

  // State untuk navigasi subtes dan filter jawaban
  const [activeSubtest, setActiveSubtest] = useState("all")
  const [answerFilter, setAnswerFilter] = useState("all")
  const [isDownloading, setIsDownloading] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Load user data
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }

    const savedSession = localStorage.getItem("tryoutSession")
    if (!savedSession) {
      router.push("/register")
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

      // Check if this is a mini practice session
      const isPracticeMode = parsedSession.isPracticeMode === true

      if (isPracticeMode) {
        // For mini practice, only evaluate the current subtest
        const subtest = parsedSession.currentSubtest
        const subtestAnswers = parsedSession.subtes[subtest]?.soalJawaban || {}
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
          if (!question) continue // Skip if question doesn't exist

          const userAnswer = subtestAnswers[question.id]

          // Add to questions array for detailed view
          evaluationResults.questions.push({
            id: question.id,
            text: question.text || "Soal tidak tersedia",
            options: question.options || [],
            userAnswer: userAnswer || "",
            correctAnswer: question.correctAnswer || "",
            correct: userAnswer === question.correctAnswer,
            explanation: question.explanation || "Tidak ada penjelasan tersedia.",
            subtest: subtest,
            type: question.type || "single",
            image: question.image || null,
            diagram: question.diagram || null,
            map: question.map || null,
          })

          // Count correct answers
          if (userAnswer === question.correctAnswer) {
            subtestCorrect++
            totalCorrect++
          }

          totalQuestions++
        }

        // Add subtest results
        evaluationResults.subtests[subtest] = {
          score: subtestCorrect,
          total: subtestTotal,
        }
      } else {
        // For full exam, evaluate all subtests
        for (const subtest of Object.keys(parsedSession.subtes || {})) {
          const subtestAnswers = parsedSession.subtes[subtest]?.soalJawaban || {}
          const questionsJson = localStorage.getItem(`questions_${subtest}`)

          if (!questionsJson) {
            console.warn(`Soal untuk ${subtest} tidak ditemukan, melewati evaluasi subtes ini`)
            // Create empty subtest result to avoid errors
            evaluationResults.subtests[subtest] = {
              score: 0,
              total: 0,
            }
            continue // Skip this subtest and continue with others
          }

          const questions = JSON.parse(questionsJson)
          const subtestTotal = questions?.length || 0
          let subtestCorrect = 0

          // Check each answer
          for (let i = 0; i < subtestTotal; i++) {
            const question = questions[i]
            if (!question) continue // Skip if question doesn't exist

            const userAnswer = subtestAnswers[question.id]

            // Add to questions array for detailed view
            evaluationResults.questions.push({
              id: question.id,
              text: question.text || "Soal tidak tersedia",
              options: question.options || [],
              userAnswer: userAnswer || "",
              correctAnswer: question.correctAnswer || "",
              correct: userAnswer === question.correctAnswer,
              explanation: question.explanation || "Tidak ada penjelasan tersedia.",
              subtest: subtest,
              type: question.type || "single",
              image: question.image || null,
              diagram: question.diagram || null,
              map: question.map || null,
            })

            // Count correct answers
            if (userAnswer === question.correctAnswer) {
              subtestCorrect++
              totalCorrect++
            }

            totalQuestions++
          }

          // Add subtest results
          evaluationResults.subtests[subtest] = {
            score: subtestCorrect,
            total: subtestTotal,
          }
        }
      }

      // Set total score
      evaluationResults.totalScore = totalCorrect

      // Set results
      setResults(evaluationResults)

      // Set initial paginated questions and filtered count
      if (evaluationResults.questions && evaluationResults.questions.length > 0) {
        updatePaginatedQuestions(evaluationResults.questions, 1, questionsPerPage)
        setFilteredQuestionsCount(evaluationResults.questions.length)
      } else {
        setPaginatedQuestions([])
        setFilteredQuestionsCount(0)
      }
    } catch (err: any) {
      console.error("Error evaluating answers:", err)
      setError(err.message || "Terjadi kesalahan saat mengevaluasi jawaban.")

      // Fallback to mock evaluations
      setResults(mockEvaluations)
      if (mockEvaluations.questions && mockEvaluations.questions.length > 0) {
        updatePaginatedQuestions(mockEvaluations.questions, 1, questionsPerPage)
        setFilteredQuestionsCount(mockEvaluations.questions.length)
      } else {
        setPaginatedQuestions([])
        setFilteredQuestionsCount(0)
      }
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
      // Filter questions based on current filters
      let filteredQuestions = [...results.questions]

      // Filter by subtest
      if (activeSubtest !== "all") {
        filteredQuestions = filteredQuestions.filter((q) => q.subtest === activeSubtest)
      }

      // Filter by answer status
      if (answerFilter === "correct") {
        filteredQuestions = filteredQuestions.filter((q) => q.correct)
      } else if (answerFilter === "incorrect") {
        filteredQuestions = filteredQuestions.filter((q) => !q.correct)
      }

      updatePaginatedQuestions(filteredQuestions, page, questionsPerPage)
    }
  }

  const handleRetry = () => {
    // Check if this was a mini practice session
    const isPracticeMode = session?.isPracticeMode === true

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

    // Navigate to appropriate page based on session type
    if (isPracticeMode) {
      const mode = localStorage.getItem("questionMode") || "builtin"
      router.push(`/register?mode=${mode}&practice=true`)
    } else {
      // Navigate to instructions page
      router.push("/register")
    }
  }

  const generateAnalysis = () => {
    if (!results) return null

    try {
      // Convert subtest scores to data for chart
      const chartData = Object.keys(results.subtests || {}).map((subtest) => ({
        name: getAbbreviatedSubtest(subtest),
        fullName: subtest,
        score: (results.subtests[subtest]?.score / Math.max(1, results.subtests[subtest]?.total || 1)) * 100,
        correct: results.subtests[subtest]?.score || 0,
        total: results.subtests[subtest]?.total || 0,
      }))

      // Find strengths and weaknesses
      const subtestScores = Object.keys(results.subtests || {}).map((subtest) => ({
        name: subtest,
        percentage: (results.subtests[subtest]?.score / Math.max(1, results.subtests[subtest]?.total || 1)) * 100,
      }))

      // Sort and get top/bottom subtests, but only if there are subtests
      const strengths =
        subtestScores.length > 0
          ? [...subtestScores].sort((a, b) => b.percentage - a.percentage).slice(0, Math.min(2, subtestScores.length))
          : []

      const weaknesses =
        subtestScores.length > 0
          ? [...subtestScores].sort((a, b) => a.percentage - b.percentage).slice(0, Math.min(2, subtestScores.length))
          : []

      // Calculate total questions safely
      const totalQuestions = Object.values(results.subtests).reduce(
        (sum: any, subtest: any) => sum + (subtest.total || 0),
        0,
      )

      // Create data for pie chart
      const pieData = [
        { name: "Benar", value: results.totalScore || 0, color: "#10b981" },
        {
          name: "Salah",
          value: Math.max(0, totalQuestions - (results.totalScore || 0)),
          color: "#ef4444",
        },
      ]

      // Create data for radar chart
      const radarData = chartData.map((item) => ({
        subject: item.name,
        A: item.score,
        fullMark: 100,
      }))

      // Create data for line chart (simulated progress over time)
      const lineData = [
        { name: "Tes 1", score: 65 },
        { name: "Tes 2", score: 72 },
        { name: "Tes 3", score: 78 },
        {
          name: "Tes Saat Ini",
          score: totalQuestions > 0 ? ((results.totalScore || 0) / totalQuestions) * 100 : 0,
        },
      ]

      return {
        chartData,
        strengths,
        weaknesses,
        pieData,
        radarData,
        lineData,
      }
    } catch (error) {
      console.error("Error generating analysis:", error)
      return {
        chartData: [],
        strengths: [],
        weaknesses: [],
        pieData: [
          { name: "Benar", value: results.totalScore || 0, color: "#10b981" },
          { name: "Salah", value: 0, color: "#ef4444" },
        ],
        radarData: [],
        lineData: [],
      }
    }
  }

  // Function to abbreviate subtest names
  const getAbbreviatedSubtest = (subtest: string) => {
    switch (subtest) {
      case "Penalaran Umum":
        return "PU"
      case "Pengetahuan dan Pemahaman Umum":
        return "PPU"
      case "Kemampuan Memahami Bacaan dan Menulis":
        return "PBM"
      case "Pengetahuan Kuantitatif":
        return "PK"
      case "Literasi dalam Bahasa Indonesia":
        return "B Indo"
      case "Literasi dalam Bahasa Inggris":
        return "B Inggris"
      case "Penalaran Matematika":
        return "MTK"
      default:
        return subtest
    }
  }

  // Function to filter and update questions based on subtest and answer
  const filterAndUpdateQuestions = (subtest: string, filter: string) => {
    if (!results || !results.questions) return

    let filteredQuestions = [...results.questions]

    // Filter berdasarkan subtes
    if (subtest !== "all") {
      filteredQuestions = filteredQuestions.filter((q) => q.subtest === subtest)
    }

    // Filter berdasarkan status jawaban
    if (filter === "correct") {
      filteredQuestions = filteredQuestions.filter((q) => q.correct)
    } else if (filter === "incorrect") {
      filteredQuestions = filteredQuestions.filter((q) => !q.correct)
    }

    // Update state
    setFilteredQuestionsCount(filteredQuestions.length)
    updatePaginatedQuestions(filteredQuestions, 1, questionsPerPage)
    setCurrentPage(1)
  }

  // Function to download results as PDF
  const downloadResultsAsPDF = async () => {
    if (!resultsRef.current) return

    setIsDownloading(true)

    try {
      // Prepare PDF
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15

      // Add header with user info
      const userData = JSON.parse(localStorage.getItem("userData") || "{}")

      // Add logo and title
      pdf.setFillColor(37, 99, 235) // Blue color
      pdf.rect(0, 0, pageWidth, 30, "F")

      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(18)
      pdf.text("UTBK Simulator 2025", pageWidth / 2, 12, { align: "center" })
      pdf.setFontSize(12)
      pdf.text("Laporan Hasil Simulasi", pageWidth / 2, 20, { align: "center" })

      // Add user info
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.text("Data Peserta", margin, 40)

      pdf.setDrawColor(37, 99, 235)
      pdf.setLineWidth(0.5)
      pdf.line(margin, 42, pageWidth - margin, 42)

      pdf.setFontSize(10)
      if (userData.name) {
        pdf.text(`Nama: ${userData.name}`, margin, 48)
      }
      if (userData.school) {
        pdf.text(`Asal Sekolah/Institusi: ${userData.school}`, margin, 54)
      }
      pdf.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, margin, 60)

      // Add summary
      pdf.setFontSize(12)
      pdf.text("Ringkasan Hasil", margin, 70)
      pdf.setDrawColor(37, 99, 235)
      pdf.line(margin, 72, pageWidth - margin, 72)

      pdf.setFontSize(14)
      const totalQuestions = Object.values(results.subtests).reduce((sum: any, subtest: any) => sum + subtest.total, 0)
      const scorePercentage = totalQuestions > 0 ? Math.round((results.totalScore / totalQuestions) * 100) : 0
      pdf.text(`Skor Total: ${results.totalScore} dari ${totalQuestions} (${scorePercentage}%)`, margin, 80)

      // Add performance indicator
      let performanceText = ""
      if (scorePercentage >= 80) performanceText = "Sangat Baik"
      else if (scorePercentage >= 70) performanceText = "Baik"
      else if (scorePercentage >= 60) performanceText = "Cukup"
      else if (scorePercentage >= 50) performanceText = "Kurang"
      else performanceText = "Perlu Banyak Latihan"

      pdf.setFontSize(12)
      pdf.text(`Kategori Performa: ${performanceText}`, margin, 88)

      // Add subtest scores
      pdf.setFontSize(12)
      pdf.text("Skor per Subtes:", margin, 98)

      let yPos = 106
      Object.keys(results.subtests).forEach((subtest, index) => {
        const score = results.subtests[subtest].score
        const total = results.subtests[subtest].total
        const percentage = total > 0 ? Math.round((score / total) * 100) : 0

        // Draw progress bar
        const barWidth = 100
        const filledWidth = (percentage / 100) * barWidth

        pdf.setDrawColor(200, 200, 200)
        pdf.setFillColor(200, 200, 200)
        pdf.roundedRect(margin + 70, yPos - 4, barWidth, 5, 1, 1, "F")

        pdf.setFillColor(37, 99, 235)
        pdf.roundedRect(margin + 70, yPos - 4, filledWidth, 5, 1, 1, "F")

        pdf.text(`${index + 1}. ${subtest}:`, margin, yPos)
        pdf.text(`${score}/${total} (${percentage}%)`, margin + barWidth + 75, yPos)

        yPos += 10

        // Add new page if needed
        if (yPos > pageHeight - 30) {
          pdf.addPage()
          yPos = 30
        }
      })

      // Add analysis section
      pdf.addPage()
      pdf.setFillColor(37, 99, 235)
      pdf.rect(0, 0, pageWidth, 20, "F")

      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.text("Analisis Performa", pageWidth / 2, 12, { align: "center" })

      pdf.setTextColor(0, 0, 0)

      // Add strengths
      const analysis = generateAnalysis()
      if (analysis) {
        pdf.setFontSize(12)
        pdf.text("Kekuatan:", margin, 30)

        yPos = 38
        if (analysis.strengths && analysis.strengths.length > 0) {
          analysis.strengths.forEach((strength, index) => {
            pdf.text(`${index + 1}. ${strength.name} (${strength.percentage.toFixed(1)}% benar)`, margin, yPos)
            yPos += 8
          })
        } else {
          pdf.text("Tidak ada data yang cukup untuk analisis kekuatan", margin, yPos)
          yPos += 8
        }

        // Add weaknesses
        pdf.text("Area Pengembangan:", margin, yPos + 8)
        yPos += 16

        if (analysis.weaknesses && analysis.weaknesses.length > 0) {
          analysis.weaknesses.forEach((weakness, index) => {
            pdf.text(`${index + 1}. ${weakness.name} (hanya ${weakness.percentage.toFixed(1)}% benar)`, margin, yPos)
            yPos += 8
          })
        } else {
          pdf.text("Tidak ada data yang cukup untuk analisis area pengembangan", margin, yPos)
          yPos += 8
        }

        // Add recommendations
        yPos += 10
        pdf.text("Rekomendasi Belajar:", margin, yPos)
        yPos += 8

        pdf.text("1. Fokus pada area yang perlu ditingkatkan:", margin, yPos)
        yPos += 6

        if (analysis.weaknesses && analysis.weaknesses.length > 0) {
          analysis.weaknesses.forEach((weakness, index) => {
            pdf.text(`   • ${weakness.name}`, margin, yPos)
            yPos += 6
          })
        }

        yPos += 4
        pdf.text("2. Strategi belajar yang disarankan:", margin, yPos)
        yPos += 6
        pdf.text("   • Latih kemampuan penalaran logis pada soal-soal yang membutuhkan analisis mendalam", margin, yPos)
        yPos += 6
        pdf.text("   • Tingkatkan kecepatan membaca dan analisis untuk subtes dengan teks panjang", margin, yPos)
        yPos += 6
        pdf.text("   • Gunakan mode Latihan Mini untuk fokus pada area yang perlu ditingkatkan", margin, yPos)
        yPos += 6
        pdf.text("   • Buat jadwal belajar rutin dengan fokus pada subtes yang lemah", margin, yPos)
      }

      // Add footer
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(100, 100, 100)
        pdf.text(`UTBK Simulator 2025 | Halaman ${i} dari ${totalPages}`, pageWidth / 2, pageHeight - 10, {
          align: "center",
        })
      }

      // Generate a filename with the user's name if available
      const filename =
        userData && userData.name
          ? `hasil-utbk-${userData.name.replace(/\s+/g, "-")}-${new Date().toLocaleDateString("id-ID").replace(/\//g, "-")}.pdf`
          : "hasil-utbk-simulator.pdf"

      // Save PDF
      pdf.save(filename)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Terjadi kesalahan saat mengunduh hasil. Silakan coba lagi.")
    } finally {
      setIsDownloading(false)
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
  const totalPages = Math.ceil(filteredQuestionsCount / questionsPerPage)

  // Custom pagination component
  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }) => {
    return (
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </Button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Selanjutnya
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl" ref={resultsRef}>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
          <div>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Hasil Simulasi UTBK 2025
            </CardTitle>
            <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
              {userData && (
                <>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{userData.name}</span>
                  </div>
                  <div className="hidden md:block text-gray-400">|</div>
                  <div className="flex items-center gap-1">
                    <School className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{userData.school}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadResultsAsPDF}
              disabled={isDownloading}
              className="flex items-center gap-1"
            >
              {isDownloading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1"></div>
              ) : (
                <Download className="h-4 w-4" />
              )}
              Unduh PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="flex items-center gap-1 print:hidden"
            >
              <Printer className="h-4 w-4" />
              Cetak
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 gap-1 overflow-x-auto">
              <TabsTrigger value="overview" className="text-xs md:text-sm px-2 py-1">
                Ringkasan
              </TabsTrigger>
              <TabsTrigger value="subtests" className="text-xs md:text-sm px-2 py-1">
                Per Subtes
              </TabsTrigger>
              <TabsTrigger value="questions" className="text-xs md:text-sm px-2 py-1">
                Detail Soal
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs md:text-sm px-2 py-1">
                Analisis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Skor Total: {results.totalScore}</h2>
                <p className="text-gray-500">
                  Dari total{" "}
                  {Object.values(results.subtests).reduce((sum: any, subtest: any) => sum + subtest.total, 0)} soal
                </p>

                {/* Overall progress bar */}
                <div className="mt-4 max-w-md mx-auto">
                  <Progress
                    value={
                      (results.totalScore /
                        Object.values(results.subtests).reduce((sum: any, subtest: any) => sum + subtest.total, 0)) *
                      100
                    }
                    className="h-4 bg-gray-100"
                  />
                </div>

                {/* Pie chart for correct vs incorrect */}
                <div className="mt-8 h-64" ref={pieChartRef}>
                  <h3 className="text-lg font-semibold mb-4">Distribusi Jawaban</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={generateAnalysis()?.pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {generateAnalysis()?.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid gap-6"> </div>

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
              <div className="grid gap-6 md:grid-cols-2">
                {Object.keys(results.subtests).map((subtest) => (
                  <Card key={subtest} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                      <CardTitle>{subtest}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
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

              {/* Bar chart for subtest comparison */}
              <div className="mt-8 h-64" ref={chartRef}>
                <h3 className="text-lg font-semibold mb-4">Perbandingan Performa Antar Subtes</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={generateAnalysis()?.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value, name, props) => [`${value.toFixed(1)}%`, props.payload.fullName]}
                      labelFormatter={(label) => "Subtes"}
                    />
                    <Bar dataKey="score" fill="#3b82f6" name="Persentase Benar">
                      {generateAnalysis()?.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-6">
              {/* Navigasi Subtes */}
              <div className="mb-4 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-2">Pilih Subtes</h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {Object.keys(results.subtests).map((subtest) => (
                    <Button
                      key={subtest}
                      variant={activeSubtest === subtest ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setActiveSubtest(subtest)
                        filterAndUpdateQuestions(subtest, answerFilter)
                      }}
                      className="text-xs md:text-sm px-2 py-1"
                    >
                      {getAbbreviatedSubtest(subtest)}
                    </Button>
                  ))}
                  <Button
                    variant={activeSubtest === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setActiveSubtest("all")
                      filterAndUpdateQuestions("all", answerFilter)
                    }}
                    className="text-xs md:text-sm px-2 py-1"
                  >
                    Semua Soal
                  </Button>
                </div>
              </div>

              {/* Filter untuk menampilkan soal benar/salah/semua */}
              <div className="mb-4 overflow-x-auto">
                <div className="flex flex-wrap gap-1 md:gap-2">
                  <Button
                    variant={answerFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setAnswerFilter("all")
                      filterAndUpdateQuestions(activeSubtest, "all")
                    }}
                    className="text-xs md:text-sm px-2 py-1"
                  >
                    Semua Jawaban
                  </Button>
                  <Button
                    variant={answerFilter === "correct" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setAnswerFilter("correct")
                      filterAndUpdateQuestions(activeSubtest, "correct")
                    }}
                    className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 text-xs md:text-sm px-2 py-1"
                  >
                    Jawaban Benar
                  </Button>
                  <Button
                    variant={answerFilter === "incorrect" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setAnswerFilter("incorrect")
                      filterAndUpdateQuestions(activeSubtest, "incorrect")
                    }}
                    className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200 text-xs md:text-sm px-2 py-1"
                  >
                    Jawaban Salah
                  </Button>
                </div>
              </div>

              <MathJaxContext config={mathJaxConfig}>
                <div className="grid gap-6">
                  {paginatedQuestions && paginatedQuestions.length > 0 ? (
                    paginatedQuestions.map((question: any) => (
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
                                <div className="flex justify-between mb-2">
                                  <h3 className="font-semibold">
                                    <MathJax>{question.text}</MathJax>
                                  </h3>
                                  <span className="text-sm text-gray-500">
                                    {question.subtest} - Soal {question.id}
                                  </span>
                                </div>

                                {/* Render question image/diagram if available */}
                                {(question.image || question.diagram || question.map) && (
                                  <div className="my-4 flex justify-center">
                                    <div className="relative max-w-full overflow-auto">
                                      <Image
                                        src={question.image || question.diagram || question.map}
                                        alt={question.image || question.diagram || question.map}
                                        width={600}
                                        height={400}
                                        className="object-contain rounded-md border border-gray-200"
                                      />
                                    </div>
                                  </div>
                                )}

                                <div className="grid gap-2">
                                  {question.type === "multiple" ? (
                                    // Multiple choice (checkbox)
                                    question.options && question.options.length > 0 ? (
                                      question.options.map((option: any) => {
                                        const isUserAnswer =
                                          Array.isArray(question.userAnswer) && question.userAnswer.includes(option.id)
                                        const isCorrectAnswer =
                                          Array.isArray(question.correctAnswer) &&
                                          question.correctAnswer.includes(option.id)

                                        return (
                                          <div
                                            key={option.id}
                                            className={`p-3 rounded-md border ${
                                              isCorrectAnswer
                                                ? "bg-green-50 border-green-200"
                                                : isUserAnswer && !isCorrectAnswer
                                                  ? "bg-red-50 border-red-200"
                                                  : ""
                                            }`}
                                          >
                                            <span className="font-semibold mr-2">{option.id}.</span>
                                            <MathJax>{option.text}</MathJax>
                                          </div>
                                        )
                                      })
                                    ) : (
                                      <div className="p-3 rounded-md border">
                                        <span className="text-gray-500">Tidak ada pilihan jawaban tersedia</span>
                                      </div>
                                    )
                                  ) : question.type === "numeric" ? (
                                    // Numeric input
                                    <div className="p-3 rounded-md border">
                                      <span className="font-semibold">Jawaban Numerik:</span>
                                      <span className="ml-2">{question.userAnswer || "-"}</span>
                                      <span className="ml-4 text-green-600">
                                        Jawaban Benar: {question.correctAnswer}
                                      </span>
                                    </div>
                                  ) : // Standard single-choice
                                  question.options && question.options.length > 0 ? (
                                    question.options.map((option: any) => (
                                      <div
                                        key={option.id}
                                        className={`p-3 rounded-md border ${
                                          option.id === question.correctAnswer
                                            ? "bg-green-50 border-green-200"
                                            : option.id === question.userAnswer && option.id !== question.correctAnswer
                                              ? "bg-red-50 border-red-200"
                                              : ""
                                        }`}
                                      >
                                        <span className="font-semibold mr-2">{option.id}.</span>
                                        <MathJax>{option.text}</MathJax>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="p-3 rounded-md border">
                                      <span className="text-gray-500">Tidak ada pilihan jawaban tersedia</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-md">
                                <p className="font-semibold mb-2">Penjelasan:</p>
                                <MathJax>{question.explanation}</MathJax>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-gray-500">Tidak ada data soal yang tersedia</p>
                    </div>
                  )}
                </div>
              </MathJaxContext>

              {/* Pagination with question count info */}
              {filteredQuestionsCount > 0 && (
                <div className="flex flex-col items-center mt-6 gap-2">
                  <div className="text-sm text-gray-500">
                    Menampilkan {Math.min(filteredQuestionsCount, (currentPage - 1) * questionsPerPage + 1)} -{" "}
                    {Math.min(currentPage * questionsPerPage, filteredQuestionsCount)} dari {filteredQuestionsCount}{" "}
                    soal
                  </div>
                  {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-blue-600" />
                    Analisis Performa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results && (
                    <div className="space-y-8">
                      {/* Bar chart */}
                      <div className="h-64" ref={chartRef}>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <BarChartIcon className="h-4 w-4 text-blue-600" />
                          Performa per Subtes (%)
                        </h3>
                        {generateAnalysis()?.chartData && generateAnalysis()?.chartData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={generateAnalysis()?.chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip
                                formatter={(value, name, props) => [`${value.toFixed(1)}%`, props.payload.fullName]}
                                labelFormatter={(label) => "Subtes"}
                              />
                              <Bar dataKey="score" fill="#3b82f6" name="Persentase Benar">
                                {generateAnalysis()?.chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Tidak ada data yang cukup untuk menampilkan grafik</p>
                          </div>
                        )}
                      </div>

                      {/* Radar chart */}
                      <div className="h-80" ref={radarChartRef}>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <PieChart className="h-4 w-4 text-blue-600" />
                          Radar Performa
                        </h3>
                        {generateAnalysis()?.radarData && generateAnalysis()?.radarData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={generateAnalysis()?.radarData}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="subject" />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} />
                              <Radar name="Performa" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                              <Tooltip />
                              <Legend />
                            </RadarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Tidak ada data yang cukup untuk menampilkan grafik</p>
                          </div>
                        )}
                      </div>

                      {/* Line chart for progress */}
                      <div className="h-64" ref={lineChartRef}>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <LineChart className="h-4 w-4 text-blue-600" />
                          Tren Performa
                        </h3>
                        {generateAnalysis()?.lineData && generateAnalysis()?.lineData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={generateAnalysis()?.lineData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, "Skor"]} />
                              <Legend />
                              <Line type="monotone" dataKey="score" stroke="#3b82f6" activeDot={{ r: 8 }} />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Tidak ada data yang cukup untuk menampilkan grafik</p>
                          </div>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            Kekuatan
                          </h3>
                          {generateAnalysis()?.strengths && generateAnalysis()?.strengths.length > 0 ? (
                            <ul className="list-disc list-inside space-y-2">
                              {generateAnalysis()?.strengths.map((strength) => (
                                <li key={strength.name} className="text-green-800">
                                  {strength.name} ({strength.percentage.toFixed(1)}% benar)
                                </li>
                              ))}
                              <li className="text-green-800">
                                Konsistensi dalam menjawab soal-soal yang membutuhkan analisis
                              </li>
                            </ul>
                          ) : (
                            <p className="text-gray-500">Tidak ada data yang cukup untuk analisis kekuatan</p>
                          )}
                        </div>

                        <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            Area Pengembangan
                          </h3>
                          {generateAnalysis()?.weaknesses && generateAnalysis()?.weaknesses.length > 0 ? (
                            <ul className="list-disc list-inside space-y-2">
                              {generateAnalysis()?.weaknesses.map((weakness) => (
                                <li key={weakness.name} className="text-red-800">
                                  {weakness.name} (hanya {weakness.percentage.toFixed(1)}% benar)
                                </li>
                              ))}
                              <li className="text-red-800">
                                Manajemen waktu perlu ditingkatkan pada subtes dengan bacaan panjang
                              </li>
                            </ul>
                          ) : (
                            <p className="text-gray-500">Tidak ada data yang cukup untuk analisis area pengembangan</p>
                          )}
                        </div>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h3 className="font-semibold mb-4">Rekomendasi</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {generateAnalysis()?.weaknesses && generateAnalysis()?.weaknesses.length > 0 ? (
                            <li className="text-blue-800">
                              Fokus latihan pada {generateAnalysis()?.weaknesses[0].name}
                            </li>
                          ) : null}
                          <li className="text-blue-800">
                            Tingkatkan kecepatan membaca dan analisis untuk subtes dengan teks panjang
                          </li>
                          <li className="text-blue-800">
                            Latih kemampuan penalaran logis pada soal-soal yang membutuhkan analisis mendalam
                          </li>
                          <li className="text-blue-800">
                            Gunakan mode Latihan Mini untuk fokus pada area yang perlu ditingkatkan
                          </li>
                          <li className="text-blue-800">
                            Buat jadwal belajar rutin dengan fokus pada subtes yang masih lemah
                          </li>
                          <li className="text-blue-800">
                            Pelajari strategi manajemen waktu untuk mengerjakan soal dengan lebih efisien
                          </li>
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
