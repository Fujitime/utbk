"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function MiniPracticePage() {
  const router = useRouter()
  const [selectedSubtest, setSelectedSubtest] = useState("Penalaran Umum")
  const [questionCount, setQuestionCount] = useState(10)
  const [timeLimit, setTimeLimit] = useState(15)
  const [apiKey, setApiKey] = useState("")

  // Check if API key exists in localStorage
  useState(() => {
    const storedApiKey = localStorage.getItem("chatgpt-api-key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  })

  const handleStartPractice = () => {
    // Store API key if provided
    if (apiKey) {
      localStorage.setItem("chatgpt-api-key", apiKey)
    }

    // Initialize a new mini practice session
    const practiceSession = {
      sessionId: `mini-practice-${Date.now()}`,
      startTime: new Date().toISOString(),
      subtes: {
        [selectedSubtest]: {
          soalJawaban: {},
          selesai: false,
        },
      },
      timeLeft: timeLimit * 60, // convert minutes to seconds
      currentSubtest: selectedSubtest,
      currentQuestion: 1,
      submitted: false,
      isPracticeMode: true,
      practiceConfig: {
        subtest: selectedSubtest,
        questionCount,
        timeLimit,
      },
    }

    localStorage.setItem("tryoutSession", JSON.stringify(practiceSession))

    // Navigate to exam page
    router.push("/exam")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Latihan Mini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subtest">Pilih Subtes</Label>
              <Select value={selectedSubtest} onValueChange={setSelectedSubtest}>
                <SelectTrigger id="subtest">
                  <SelectValue placeholder="Pilih subtes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Penalaran Umum">Penalaran Umum</SelectItem>
                  <SelectItem value="Pengetahuan dan Pemahaman Umum">Pengetahuan dan Pemahaman Umum</SelectItem>
                  <SelectItem value="Kemampuan Memahami Bacaan dan Menulis">
                    Kemampuan Memahami Bacaan dan Menulis
                  </SelectItem>
                  <SelectItem value="Pengetahuan Kuantitatif">Pengetahuan Kuantitatif</SelectItem>
                  <SelectItem value="Literasi dalam Bahasa Indonesia">Literasi dalam Bahasa Indonesia</SelectItem>
                  <SelectItem value="Literasi dalam Bahasa Inggris">Literasi dalam Bahasa Inggris</SelectItem>
                  <SelectItem value="Penalaran Matematika">Penalaran Matematika</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="question-count">Jumlah Soal: {questionCount}</Label>
                <span className="text-sm text-gray-500">Maks. 20</span>
              </div>
              <Slider
                id="question-count"
                min={5}
                max={20}
                step={1}
                value={[questionCount]}
                onValueChange={(value) => setQuestionCount(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="time-limit">Batas Waktu: {timeLimit} menit</Label>
                <span className="text-sm text-gray-500">Maks. 30 menit</span>
              </div>
              <Slider
                id="time-limit"
                min={5}
                max={30}
                step={5}
                value={[timeLimit]}
                onValueChange={(value) => setTimeLimit(value[0])}
              />
            </div>

            {!localStorage.getItem("chatgpt-api-key") && (
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key ChatGPT</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Masukkan API key ChatGPT Anda"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  API key hanya disimpan di perangkat Anda dan tidak dikirim ke server manapun.
                </p>
              </div>
            )}

            <Button
              onClick={handleStartPractice}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!localStorage.getItem("chatgpt-api-key") && !apiKey}
            >
              Mulai Latihan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
