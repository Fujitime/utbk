"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, CheckCircle, Shuffle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function InstructionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") || "ai"
  const isPractice = searchParams.get("practice") === "true"

  const [apiKey, setApiKey] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState("")
  const [savedApiKey, setSavedApiKey] = useState("")
  const [allowJumpSubtests, setAllowJumpSubtests] = useState(true)
  const [difficultyLevel, setDifficultyLevel] = useState("medium")
  const [randomizeQuestions, setRandomizeQuestions] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  // Default public API key
  const DEFAULT_API_KEY =
    "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"

  // Add state for question mode
  const [questionMode, setQuestionMode] = useState(mode)

  useEffect(() => {
    // Check if user data exists
    const storedUserData = localStorage.getItem("userData")
    if (!storedUserData) {
      router.push("/register")
      return
    }

    setUserData(JSON.parse(storedUserData))

    // Check if API key exists in localStorage
    const storedApiKey = localStorage.getItem("chatgpt-api-key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
      setSavedApiKey(storedApiKey)
    }

    // Clear any previous question generation state
    localStorage.removeItem("questionsGenerated")

    // Set default values based on practice mode
    if (isPractice) {
      // For practice mode, we might want different defaults
      setAllowJumpSubtests(false) // No jumping between subtests in practice mode
    }
  }, [router, isPractice])

  // Update the handleStartExam function to handle both modes
  const handleStartExam = () => {
    if (!agreed) {
      setError("Anda harus menyetujui syarat dan ketentuan")
      return
    }

    // Use default API key if none provided for AI mode
    const finalApiKey = questionMode === "ai" && !apiKey ? DEFAULT_API_KEY : apiKey

    // Store API key in localStorage if provided or using default
    if (finalApiKey) {
      localStorage.setItem("chatgpt-api-key", finalApiKey)
    }

    // Store the selected mode
    localStorage.setItem("questionMode", questionMode)

    // Store the difficulty level
    localStorage.setItem("difficultyLevel", difficultyLevel)

    // Store the jump subtests preference
    localStorage.setItem("allowJumpSubtests", allowJumpSubtests.toString())

    // Store the randomize questions preference
    localStorage.setItem("randomizeQuestions", randomizeQuestions.toString())

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
      timeLeft: isPractice ? 15 * 60 : 195 * 60, // 15 minutes for practice, 195 minutes for full exam
      currentSubtest: "Penalaran Umum",
      currentQuestion: 1,
      submitted: false,
      isPracticeMode: isPractice,
      practiceConfig: isPractice
        ? {
            subtest: "Penalaran Umum",
            questionCount: 10,
            timeLimit: 15,
            questionMode,
          }
        : undefined,
    }

    localStorage.setItem("tryoutSession", JSON.stringify(examSession))

    // Navigate to question generation page
    router.push("/generate-questions")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8 border-0 shadow-lg bg-gradient-to-b from-gray-50 to-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Petunjuk & Verifikasi
          </CardTitle>
          <CardDescription>Silakan baca petunjuk berikut dengan seksama sebelum memulai ujian</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {userData && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold mb-2">Data Peserta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nama Peserta</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Asal Sekolah/Institusi</p>
                    <p className="font-medium">{userData.school}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">Rincian Ujian UTBK SNBT 2025</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
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
                    <tr className="bg-gradient-to-r from-blue-50 to-purple-50 font-semibold">
                      <td className="border p-2">Total:</td>
                      <td className="border p-2">160 soal</td>
                      <td className="border p-2">195 menit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-sm">
              <InfoIcon className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                Anda memilih mode: <strong>{mode === "ai" ? "Soal AI" : "Soal Bawaan"}</strong>
              </AlertDescription>
            </Alert>

            <div className="space-y-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold">Pengaturan Ujian</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="jumpSubtests" className="font-medium">
                    Izinkan Loncat Antar Subtes
                  </Label>
                  <p className="text-sm text-gray-500">Jika diaktifkan, Anda dapat berpindah antar subtes</p>
                </div>
                <Switch id="jumpSubtests" checked={allowJumpSubtests} onCheckedChange={setAllowJumpSubtests} />
              </div>

              {mode === "builtin" && (
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="randomizeQuestions" className="font-medium flex items-center">
                      <Shuffle className="h-4 w-4 mr-1 text-blue-600" />
                      Acak Urutan Soal
                    </Label>
                    <p className="text-sm text-gray-500">Mengacak urutan soal dalam setiap subtes</p>
                  </div>
                  <Switch
                    id="randomizeQuestions"
                    checked={randomizeQuestions}
                    onCheckedChange={setRandomizeQuestions}
                  />
                </div>
              )}
            </div>

            {mode === "ai" && (
              <div className="space-y-4 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold">Pengaturan AI</h3>
                <p className="text-sm text-gray-500">
                  Untuk mode AI, diperlukan API key ChatGPT. Jika tidak diisi, akan menggunakan API key publik. API key
                  Anda hanya disimpan di perangkat Anda (localStorage) dan tidak dikirim ke server manapun.
                </p>
                <Input
                  type="password"
                  placeholder="Masukkan API key ChatGPT Anda"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="max-w-md"
                />
                {savedApiKey && (
                  <p className="text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 inline mr-1" /> API key sudah tersimpan di perangkat ini
                  </p>
                )}

                <div className="space-y-2">
                  <label htmlFor="difficulty" className="text-sm font-medium">
                    Tingkat Kesulitan Soal
                  </label>
                  <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                    <SelectTrigger id="difficulty" className="max-w-md">
                      <SelectValue placeholder="Pilih tingkat kesulitan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Mudah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="hard">Sulit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

            <Button
              onClick={handleStartExam}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Saya Mengerti, Lanjutkan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
