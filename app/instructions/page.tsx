"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, CheckCircle } from "lucide-react"

export default function InstructionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") || "ai"

  const [apiKey, setApiKey] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState("")
  const [savedApiKey, setSavedApiKey] = useState("")

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedApiKey = localStorage.getItem("chatgpt-api-key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
      setSavedApiKey(storedApiKey)
    }

    // Clear any previous question generation state
    localStorage.removeItem("questionsGenerated")
  }, [])

  const handleStartExam = () => {
    if (!agreed) {
      setError("Anda harus menyetujui syarat dan ketentuan")
      return
    }

    // Store API key in localStorage if provided
    if (apiKey) {
      localStorage.setItem("chatgpt-api-key", apiKey)
    }

    // Store the selected mode
    localStorage.setItem("questionMode", mode)

    // Initialize a new exam session
    const examSession = {
      sessionId: `session-${Date.now()}`,
      startTime: new Date().toISOString(),
      subtes: {
        "Penalaran Umum": {
          soalJawaban: {},
          selesai: false,
        },
        "Pengetahuan dan Pemahaman Umum": {
          soalJawaban: {},
          selesai: false,
        },
        "Kemampuan Memahami Bacaan dan Menulis": {
          soalJawaban: {},
          selesai: false,
        },
        "Pengetahuan Kuantitatif": {
          soalJawaban: {},
          selesai: false,
        },
        "Literasi dalam Bahasa Indonesia": {
          soalJawaban: {},
          selesai: false,
        },
        "Literasi dalam Bahasa Inggris": {
          soalJawaban: {},
          selesai: false,
        },
        "Penalaran Matematika": {
          soalJawaban: {},
          selesai: false,
        },
      },
      timeLeft: 195 * 60, // 195 minutes in seconds
      currentSubtest: "Penalaran Umum",
      currentQuestion: 1,
      submitted: false,
    }

    localStorage.setItem("tryoutSession", JSON.stringify(examSession))

    // Navigate to question generation page instead of directly to exam
    router.push("/generate-questions")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Petunjuk & Verifikasi</CardTitle>
          <CardDescription>Silakan baca petunjuk berikut dengan seksama sebelum memulai ujian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Rincian Ujian UTBK SNBT 2025</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-50 dark:bg-blue-950">
                      <th className="border p-2 text-left">Subtes</th>
                      <th className="border p-2 text-left">Jumlah Soal</th>
                      <th className="border p-2 text-left">Durasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Penalaran Umum</td>
                      <td className="border p-2">30 soal</td>
                      <td className="border p-2">30 menit</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Pengetahuan dan Pemahaman Umum</td>
                      <td className="border p-2">20 soal</td>
                      <td className="border p-2">15 menit</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Kemampuan Memahami Bacaan dan Menulis</td>
                      <td className="border p-2">20 soal</td>
                      <td className="border p-2">25 menit</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Pengetahuan Kuantitatif</td>
                      <td className="border p-2">20 soal</td>
                      <td className="border p-2">20 menit</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Literasi dalam Bahasa Indonesia</td>
                      <td className="border p-2">30 soal</td>
                      <td className="border p-2">45 menit</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Literasi dalam Bahasa Inggris</td>
                      <td className="border p-2">20 soal</td>
                      <td className="border p-2">30 menit</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Penalaran Matematika</td>
                      <td className="border p-2">20 soal</td>
                      <td className="border p-2">20 menit</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-950 font-semibold">
                      <td className="border p-2">Total:</td>
                      <td className="border p-2">160 soal</td>
                      <td className="border p-2">195 menit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Alert className="bg-blue-50 dark:bg-blue-950">
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Anda memilih mode: <strong>{mode === "ai" ? "Soal AI" : "Soal Bawaan"}</strong>
              </AlertDescription>
            </Alert>

            {mode === "ai" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">API Key ChatGPT (Opsional)</h3>
                <p className="text-sm text-gray-500">
                  Jika Anda ingin menggunakan soal yang dihasilkan dengan AI, masukkan API key ChatGPT Anda. API key
                  Anda hanya disimpan di perangkat Anda (localStorage) dan tidak dikirim ke server manapun. Jika tidak
                  diisi, aplikasi akan menggunakan soal bawaan.
                </p>
                <Input
                  type="password"
                  placeholder="Masukkan API key ChatGPT Anda (opsional)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="max-w-md"
                />
                {savedApiKey && (
                  <p className="text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 inline mr-1" /> API key sudah tersimpan di perangkat ini
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked === true)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Saya menyetujui syarat dan ketentuan penggunaan aplikasi ini
              </label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleStartExam} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
              Saya Mengerti, Lanjutkan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
