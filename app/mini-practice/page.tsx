"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Shuffle } from "lucide-react"
import { getSubtestQuestions } from "@/lib/mock-questions"

export default function MiniPracticePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultMode = searchParams.get("mode") || "ai"

  const [selectedSubtest, setSelectedSubtest] = useState("Penalaran Umum")
  const [questionCount, setQuestionCount] = useState(10)
  const [timeLimit, setTimeLimit] = useState(15)
  const [apiKey, setApiKey] = useState("")
  const [questionMode, setQuestionMode] = useState(defaultMode)
  const [apiKeyExists, setApiKeyExists] = useState(false)
  const [randomizeQuestions, setRandomizeQuestions] = useState(false)

  // Check if API key exists in localStorage
  useEffect(() => {
    const storedApiKey = localStorage.getItem("chatgpt-api-key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
      setApiKeyExists(true)
    }

    // Set default question mode based on URL parameter and API key
    if (defaultMode === "ai" && !storedApiKey) {
      setQuestionMode("builtin")
    } else {
      setQuestionMode(defaultMode)
    }
  }, [defaultMode])

  // Update the handleStartPractice function to ensure proper routing
  const handleStartPractice = () => {
    // Store API key if provided
    if (apiKey) {
      localStorage.setItem("chatgpt-api-key", apiKey)
      setApiKeyExists(true)
    }

    // Store the selected mode
    localStorage.setItem("questionMode", questionMode)

    // Store the randomize questions preference
    localStorage.setItem("randomizeQuestions", randomizeQuestions.toString())

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
        questionMode,
      },
    }

    localStorage.setItem("tryoutSession", JSON.stringify(practiceSession))

    // Also store allowJumpSubtests as false for mini practice
    localStorage.setItem("allowJumpSubtests", "false")

    // Navigate to question generation page if using AI, otherwise directly to exam
    if (questionMode === "ai" && (apiKey || apiKeyExists)) {
      localStorage.setItem("questionsGenerated", "false")
      router.push("/generate-questions")
    } else {
      // For built-in questions, generate them now and go directly to exam
      try {
        const questions = getSubtestQuestions(selectedSubtest, questionCount)

        // Randomize questions if enabled
        if (randomizeQuestions && questions.length >= 2) {
          const shuffled = [...questions].sort(() => Math.random() - 0.5)
          // Ensure IDs are sequential after shuffling
          const reindexed = shuffled.map((q, index) => ({
            ...q,
            id: index + 1,
          }))
          localStorage.setItem(`questions_${selectedSubtest}`, JSON.stringify(reindexed))
        } else {
          localStorage.setItem(`questions_${selectedSubtest}`, JSON.stringify(questions))
        }

        localStorage.setItem("questionsGenerated", "true")
        localStorage.setItem("useAIQuestions", "false")

        // Store available question counts
        const questionCounts = {}
        questionCounts[selectedSubtest] = questions.length
        localStorage.setItem("availableQuestionCounts", JSON.stringify(questionCounts))

        router.push("/exam")
      } catch (error) {
        console.error("Error generating questions:", error)
        // Show error message
        alert("Terjadi kesalahan saat menghasilkan soal. Silakan coba lagi.")
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card className="border-0 shadow-lg bg-gradient-to-b from-gray-50 to-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Latihan Mini
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subtest">Pilih Subtes</Label>
              <Select value={selectedSubtest} onValueChange={setSelectedSubtest}>
                <SelectTrigger id="subtest" className="bg-white">
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
                className="bg-gradient-to-r from-blue-100 to-purple-100"
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
                className="bg-gradient-to-r from-blue-100 to-purple-100"
              />
            </div>

            <div className="space-y-2">
              <Label>Mode Soal</Label>
              <div className="flex space-x-4">
                <RadioGroup value={questionMode} onValueChange={setQuestionMode}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ai" id="ai" disabled={!apiKeyExists && !apiKey} />
                    <Label htmlFor="ai" className={!apiKeyExists && !apiKey ? "opacity-50" : ""}>
                      Soal AI
                      {!apiKeyExists && !apiKey && (
                        <span className="text-xs text-red-500 block">Memerlukan API key</span>
                      )}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="builtin" id="builtin" />
                    <Label htmlFor="builtin">Soal Bawaan</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {questionMode === "builtin" && (
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="randomizeQuestions" className="font-medium flex items-center">
                    <Shuffle className="h-4 w-4 mr-1 text-blue-600" />
                    Acak Urutan Soal
                  </Label>
                  <p className="text-sm text-gray-500">Mengacak urutan soal dalam subtes</p>
                </div>
                <Switch id="randomizeQuestions" checked={randomizeQuestions} onCheckedChange={setRandomizeQuestions} />
              </div>
            )}

            {!apiKeyExists && questionMode === "ai" && (
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
              disabled={questionMode === "ai" && !apiKeyExists && !apiKey}
            >
              Mulai Latihan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
