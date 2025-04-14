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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedSession = localStorage.getItem("tryoutSession")
    if (!savedSession) {
      router.push("/instructions")
      return
    }

    const parsedSession = JSON.parse(savedSession)
    setSession(parsedSession)

    // Calculate stats
    let answered = 0
    let flagged = 0

    // Get flagged questions
    const flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions") || "{}")

    // Count answered and flagged questions
    Object.keys(parsedSession.subtes).forEach((subtest) => {
      const subtestAnswers = parsedSession.subtes[subtest].soalJawaban
      answered += Object.keys(subtestAnswers).length

      // Count flagged in this subtest
      Object.keys(subtestAnswers).forEach((questionNumber) => {
        if (flaggedQuestions[`${subtest}-${questionNumber}`]) {
          flagged++
        }
      })
    })

    setStats({
      answered,
      unanswered: 160 - answered,
      flagged,
      total: 160,
    })

    setLoading(false)
  }, [])

  const handleSubmit = () => {
    setShowConfirmDialog(true)
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

  const handleContinue = () => {
    router.push("/exam")
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
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Kumpulkan Ujian
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  )
}
