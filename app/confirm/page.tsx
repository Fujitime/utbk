"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react"

export default function ConfirmPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [stats, setStats] = useState({
    answered: 0,
    unanswered: 0,
    flagged: 0,
    total: 160,
  })
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add this function to clear all timer data
  const clearAllTimerData = () => {
    localStorage.removeItem("examTimerStart")
    localStorage.removeItem("examTimerEnd")

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
      localStorage.removeItem(`subtestTimer_${subtest}_start`)
      localStorage.removeItem(`subtestTimer_${subtest}_end`)
    })
  }

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("tryoutSession")
      if (!savedSession) {
        router.push("/register")
        return
      }

      const parsedSession = JSON.parse(savedSession)
      setSession(parsedSession)

      // Calculate stats
      let answered = 0
      let flagged = 0
      let totalQuestions = 0

      // Get flagged questions
      const flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions") || "{}")

      // Check if this is a mini practice session
      const isPracticeMode = parsedSession.isPracticeMode === true

      if (isPracticeMode) {
        // For mini practice, only count questions for the current subtest
        const subtest = parsedSession.currentSubtest
        const subtestAnswers = parsedSession.subtes[subtest]?.soalJawaban || {}

        // Get the question count for this subtest
        const questionsJson = localStorage.getItem(`questions_${subtest}`)
        const questions = questionsJson ? JSON.parse(questionsJson) : []
        totalQuestions = questions.length

        // Count answered and flagged questions
        answered = Object.keys(subtestAnswers).length

        // Count flagged in this subtest
        Object.keys(flaggedQuestions || {}).forEach((key) => {
          if (key.startsWith(`${subtest}-`) && flaggedQuestions[key]) {
            flagged++
          }
        })
      } else {
        // For full exam, count all subtests
        // Get available question counts
        const availableQuestionCountsJson = localStorage.getItem("availableQuestionCounts")
        const availableQuestionCounts = availableQuestionCountsJson ? JSON.parse(availableQuestionCountsJson) : {}

        // Calculate total questions from available counts
        totalQuestions = Object.values(availableQuestionCounts).reduce((sum: any, count: any) => sum + count, 0)

        // If no available counts, use default value
        if (totalQuestions === 0) {
          totalQuestions = 160
        }

        // Count answered and flagged questions
        Object.keys(parsedSession.subtes || {}).forEach((subtest) => {
          const subtestAnswers = parsedSession.subtes[subtest]?.soalJawaban || {}
          answered += Object.keys(subtestAnswers).length

          // Count flagged in this subtest
          Object.keys(flaggedQuestions || {}).forEach((key) => {
            if (key.startsWith(`${subtest}-`) && flaggedQuestions[key]) {
              flagged++
            }
          })
        })
      }

      setStats({
        answered,
        unanswered: totalQuestions - answered,
        flagged,
        total: totalQuestions,
      })

      setLoading(false)
    } catch (error) {
      console.error("Error loading session:", error)
      setLoading(false)
      // Handle error gracefully
      setStats({
        answered: 0,
        unanswered: 0,
        flagged: 0,
        total: 0,
      })
    }
  }, [])

  // Update the handleSubmit function to clear timer data
  const handleSubmit = () => {
    if (!session) return

    setSubmitting(true)

    try {
      // Clear all timer data
      clearAllTimerData()

      // Mark session as submitted
      const updatedSession = { ...session }
      updatedSession.submitted = true
      localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))

      // Navigate to results page
      router.push("/results")
    } catch (error) {
      console.error("Error submitting exam:", error)
      setError("Terjadi kesalahan saat mengirimkan ujian. Silakan coba lagi.")
      setSubmitting(false)
    }
  }

  const confirmSubmit = () => {
    if (!session) return

    // Mark session as submitted
    const updatedSession = { ...session }
    updatedSession.submitted = true
    localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))

    // Navigate to results page
    router.push("/results")
  }

  // Update the handleContinue function to ensure timer data is preserved
  const handleContinue = () => {
    router.push("/exam")
  }

  // Update the handleRetry function to clear timer data
  const handleRetry = () => {
    // Clear timer data
    clearAllTimerData()

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
    const isPracticeMode = session?.isPracticeMode === true
    if (isPracticeMode) {
      const mode = localStorage.getItem("questionMode") || "builtin"
      router.push(`/mini-practice?mode=${mode}`)
    } else {
      // Navigate to instructions page
      router.push("/instructions")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Konfirmasi Pengumpulan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Ringkasan Progress</h2>
              <p className="text-gray-500 mb-4">Pastikan Anda telah menjawab semua soal sebelum mengumpulkan.</p>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Soal Terjawab</span>
                  </div>
                  <span className="font-semibold">
                    {stats.answered} dari {stats.total}
                  </span>
                </div>
                <Progress value={(stats.answered / stats.total) * 100} className="h-2 bg-gray-100" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span>Soal Belum Terjawab</span>
                  </div>
                  <span className="font-semibold">
                    {stats.unanswered} dari {stats.total}
                  </span>
                </div>
                <Progress value={(stats.unanswered / stats.total) * 100} className="h-2 bg-gray-100" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-yellow-500" />
                    <span>Soal Ditandai Ragu</span>
                  </div>
                  <span className="font-semibold">{stats.flagged}</span>
                </div>
                <Progress value={(stats.flagged / stats.total) * 100} className="h-2 bg-gray-100" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="outline" onClick={handleContinue}>
                Kembali ke Ujian
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                {submitting ? "Mengirim..." : "Kumpulkan Ujian"}
              </Button>
              <Button variant="destructive" onClick={handleRetry}>
                Ulangi Ujian
              </Button>
            </div>
            {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
          </div>
        </CardContent>
      </Card>

      {/* Regular confirmation dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda yakin ingin mengakhiri ujian?</AlertDialogTitle>
            <AlertDialogDescription>
              {stats.unanswered > 0 ? (
                <span className="text-red-500">Anda masih memiliki {stats.unanswered} soal yang belum terjawab.</span>
              ) : (
                "Semua soal telah terjawab. Jawaban Anda akan dikirim untuk penilaian."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>Ya, Kumpulkan Ujian</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Emergency dialog for unanswered questions */}
      <AlertDialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Peringatan: Soal Belum Terjawab!</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-2">
                <div className="text-red-500 font-semibold">
                  Anda masih memiliki {stats.unanswered} soal yang belum terjawab.
                </div>
                <div>
                  Sebaiknya kembali ke ujian dan jawab semua soal yang tersisa. Soal yang tidak dijawab akan dianggap
                  salah dan akan mempengaruhi nilai akhir Anda.
                </div>
                <div className="font-semibold">Apakah Anda tetap ingin mengumpulkan ujian?</div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali ke Ujian</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit} className="bg-red-600 hover:bg-red-700">
              Tetap Kumpulkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
