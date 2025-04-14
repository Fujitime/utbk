"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, AlertTriangle, Flag } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { ExamTimer } from "@/components/exam-timer"
import { mockQuestions } from "@/lib/mock-questions"
import { Progress } from "@/components/ui/progress"

export default function ExamPage() {
  const router = useRouter()
  const isMobile = useMobile()
  const [session, setSession] = useState<any>(null)
  const [currentSubtest, setCurrentSubtest] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [flagged, setFlagged] = useState(false)
  const [tabWarning, setTabWarning] = useState(false)
  const [idleWarning, setIdleWarning] = useState(false)
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Load session from localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem("tryoutSession")
    if (!savedSession) {
      router.push("/instructions")
      return
    }

    const parsedSession = JSON.parse(savedSession)
    setSession(parsedSession)
    setCurrentSubtest(parsedSession.currentSubtest)
    setCurrentQuestionIndex(parsedSession.currentQuestion)

    // Load the current question
    loadQuestion(parsedSession.currentSubtest, parsedSession.currentQuestion)

    setLoading(false)

    // Set up idle detection
    setupIdleDetection()

    // Set up tab change detection
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Request fullscreen if supported
    try {
      const examContainer = document.getElementById("exam-container")
      if (examContainer && examContainer.requestFullscreen) {
        examContainer.requestFullscreen()
      }
    } catch (error) {
      console.log("Fullscreen not supported or denied")
    }

    // Add beforeunload event listener
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message =
        "Anda yakin ingin meninggalkan ujian? Progress Anda akan tetap tersimpan, tetapi timer akan terus berjalan."
      e.returnValue = message
      return message
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (idleTimer) clearTimeout(idleTimer)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  // Load question data (in a real app, this would fetch from an API or generate with AI)
  const loadQuestion = (subtest: string, questionNumber: number) => {
    setLoading(true)

    // For this demo, we'll use mock questions
    const subtestQuestions = mockQuestions[subtest] || []

    // If question doesn't exist, generate a placeholder with proper numbering
    const question = subtestQuestions[questionNumber - 1] || {
      id: questionNumber,
      text: `Soal ${questionNumber} untuk ${subtest} sedang dimuat...`,
      options: [
        { id: "A", text: "Opsi A" },
        { id: "B", text: "Opsi B" },
        { id: "C", text: "Opsi C" },
        { id: "D", text: "Opsi D" },
      ],
    }

    setCurrentQuestion(question)

    // Load saved answer if exists
    if (session && session.subtes[subtest].soalJawaban[questionNumber]) {
      setSelectedAnswer(session.subtes[subtest].soalJawaban[questionNumber])
    } else {
      setSelectedAnswer("")
    }

    // Load flagged status
    const flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions") || "{}")
    setFlagged(flaggedQuestions[`${subtest}-${questionNumber}`] || false)

    setLoading(false)

    // In a real app, this would be where you'd call the API to generate a question
    // if it doesn't exist in the cache
  }

  // Handle visibility change (tab switching)
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      setTabWarning(true)
    }
  }

  // Setup idle detection
  const setupIdleDetection = () => {
    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer)

      // Only set idle timer if user is not actively answering or reading
      if (!document.activeElement || !document.activeElement.classList.contains("question-interaction")) {
        setIdleTimer(
          setTimeout(() => {
            setIdleWarning(true)
          }, 60000), // Increased to 60 seconds
        )
      }
    }

    // Reset timer on user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]
    events.forEach((event) => {
      document.addEventListener(event, resetIdleTimer, true)
    })

    // Initial setup
    resetIdleTimer()

    // Cleanup
    return () => {
      if (idleTimer) clearTimeout(idleTimer)
      events.forEach((event) => {
        document.removeEventListener(event, resetIdleTimer, true)
      })
    }
  }

  // Save answer to localStorage
  const saveAnswer = (answer: string) => {
    if (!session) return

    const updatedSession = { ...session }
    updatedSession.subtes[currentSubtest].soalJawaban[currentQuestionIndex] = answer

    localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))
    setSession(updatedSession)
  }

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
    saveAnswer(value)
  }

  // Navigate to next question
  const handleNextQuestion = () => {
    // Get the current subtest's question count
    const subtestInfo: Record<string, { count: number; nextSubtest: string | null }> = {
      "Penalaran Umum": { count: 30, nextSubtest: "Pengetahuan dan Pemahaman Umum" },
      "Pengetahuan dan Pemahaman Umum": { count: 20, nextSubtest: "Kemampuan Memahami Bacaan dan Menulis" },
      "Kemampuan Memahami Bacaan dan Menulis": { count: 20, nextSubtest: "Pengetahuan Kuantitatif" },
      "Pengetahuan Kuantitatif": { count: 20, nextSubtest: "Literasi dalam Bahasa Indonesia" },
      "Literasi dalam Bahasa Indonesia": { count: 30, nextSubtest: "Literasi dalam Bahasa Inggris" },
      "Literasi dalam Bahasa Inggris": { count: 20, nextSubtest: "Penalaran Matematika" },
      "Penalaran Matematika": { count: 20, nextSubtest: null },
    }

    const currentInfo = subtestInfo[currentSubtest]

    if (currentQuestionIndex < currentInfo.count) {
      // Move to next question in current subtest
      const nextIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(nextIndex)

      // Update session
      const updatedSession = { ...session }
      updatedSession.currentQuestion = nextIndex
      localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))

      // Load the next question
      loadQuestion(currentSubtest, nextIndex)
    } else if (currentInfo.nextSubtest) {
      // Move to next subtest
      const nextSubtest = currentInfo.nextSubtest
      setCurrentSubtest(nextSubtest)
      setCurrentQuestionIndex(1)

      // Update session
      const updatedSession = { ...session }
      updatedSession.currentSubtest = nextSubtest
      updatedSession.currentQuestion = 1
      localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))

      // Load the first question of next subtest
      loadQuestion(nextSubtest, 1)
    } else {
      // End of exam, navigate to confirmation page
      router.push("/confirm")
    }
  }

  // Navigate to previous question
  const handlePrevQuestion = () => {
    // Get the previous subtest's info
    const subtestInfo: Record<string, { count: number; prevSubtest: string | null }> = {
      "Penalaran Umum": { count: 30, prevSubtest: null },
      "Pengetahuan dan Pemahaman Umum": { count: 20, prevSubtest: "Penalaran Umum" },
      "Kemampuan Memahami Bacaan dan Menulis": { count: 20, prevSubtest: "Pengetahuan dan Pemahaman Umum" },
      "Pengetahuan Kuantitatif": { count: 20, prevSubtest: "Kemampuan Memahami Bacaan dan Menulis" },
      "Literasi dalam Bahasa Indonesia": { count: 30, prevSubtest: "Pengetahuan Kuantitatif" },
      "Literasi dalam Bahasa Inggris": { count: 20, prevSubtest: "Literasi dalam Bahasa Indonesia" },
      "Penalaran Matematika": { count: 20, prevSubtest: "Literasi dalam Bahasa Inggris" },
    }

    const currentInfo = subtestInfo[currentSubtest]

    if (currentQuestionIndex > 1) {
      // Move to previous question in current subtest
      const prevIndex = currentQuestionIndex - 1
      setCurrentQuestionIndex(prevIndex)

      // Update session
      const updatedSession = { ...session }
      updatedSession.currentQuestion = prevIndex
      localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))

      // Load the previous question
      loadQuestion(currentSubtest, prevIndex)
    } else if (currentInfo.prevSubtest) {
      // Move to last question of previous subtest
      const prevSubtest = currentInfo.prevSubtest
      const prevSubtestCount = subtestInfo[prevSubtest].count

      setCurrentSubtest(prevSubtest)
      setCurrentQuestionIndex(prevSubtestCount)

      // Update session
      const updatedSession = { ...session }
      updatedSession.currentSubtest = prevSubtest
      updatedSession.currentQuestion = prevSubtestCount
      localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))

      // Load the last question of previous subtest
      loadQuestion(prevSubtest, prevSubtestCount)
    }
  }

  // Toggle flag for current question
  const toggleFlag = () => {
    const newFlaggedState = !flagged
    setFlagged(newFlaggedState)

    // Save flagged state to localStorage
    const flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions") || "{}")
    flaggedQuestions[`${currentSubtest}-${currentQuestionIndex}`] = newFlaggedState
    localStorage.setItem("flaggedQuestions", JSON.stringify(flaggedQuestions))
  }

  // Handle time update
  const handleTimeUpdate = (timeLeft: number) => {
    if (!session) return

    const updatedSession = { ...session }
    updatedSession.timeLeft = timeLeft
    localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))
  }

  // Handle time expired
  const handleTimeExpired = () => {
    router.push("/confirm")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div id="exam-container" className="min-h-screen bg-white">
      {/* Header with timer and subtest info */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-semibold">{currentSubtest}</h1>
            <p className="text-sm text-gray-500">Soal {currentQuestionIndex}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            {session && (
              <ExamTimer
                initialTime={session.timeLeft}
                onTimeUpdate={handleTimeUpdate}
                onTimeExpired={handleTimeExpired}
              />
            )}
          </div>
        </div>
      </header>

      {/* Warning alerts */}
      {tabWarning && (
        <Alert className="m-4 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-600">
            Anda beralih dari tab ujian. Mohon tetap fokus pada ujian.
            <Button variant="outline" size="sm" className="ml-2" onClick={() => setTabWarning(false)}>
              Tutup
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {idleWarning && (
        <Alert className="m-4 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-600">
            Tidak ada aktivitas selama 60 detik. Apakah Anda masih mengerjakan ujian?
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => {
                setIdleWarning(false)
                setupIdleDetection()
              }}
            >
              Tetap Lanjutkan Ujian
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <main className="container mx-auto p-4">
        {/* Question card */}
        <Card className="p-6">
          <CardContent className="p-0">
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Soal {currentQuestionIndex}</h2>
                <Button
                  variant={flagged ? "destructive" : "outline"}
                  size="sm"
                  onClick={toggleFlag}
                  className="flex items-center gap-1"
                >
                  <Flag className="h-4 w-4" />
                  {flagged ? "Ditandai" : "Tandai Ragu"}
                </Button>
              </div>

              {currentQuestion && (
                <div className="space-y-6">
                  <p className="text-gray-800">{currentQuestion.text}</p>

                  <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} className="space-y-3">
                    {currentQuestion.options.map((option: any) => (
                      <div
                        key={option.id}
                        onClick={() => handleAnswerSelect(option.id)}
                        className={`flex items-center rounded-lg border p-4 transition-colors duration-300 question-interaction ${
                          selectedAnswer === option.id
                            ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                            : ""
                        }`}
                        data-state={selectedAnswer === option.id ? "selected" : "unselected"}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`option-${option.id}`}
                          className="mr-3 question-interaction"
                        />
                        <Label htmlFor={`option-${option.id}`} className="w-full cursor-pointer question-interaction">
                          <span className="font-semibold mr-2">{option.id}.</span> {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentSubtest === "Penalaran Umum" && currentQuestionIndex === 1}
              >
                Sebelumnya
              </Button>
              <Button onClick={handleNextQuestion}>
                {isLastQuestion(currentSubtest, currentQuestionIndex) ? "Selesai" : "Selanjutnya"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress indicator */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{currentSubtest}</span>
            <span className="text-sm text-gray-500">
              {currentQuestionIndex} dari {getSubtestQuestionCount(currentSubtest)}
            </span>
          </div>
          <Progress value={(currentQuestionIndex / getSubtestQuestionCount(currentSubtest)) * 100} className="h-2" />
        </div>
      </main>
    </div>
  )
}

// Helper function to check if this is the last question of the exam
function isLastQuestion(subtest: string, questionIndex: number): boolean {
  return subtest === "Penalaran Matematika" && questionIndex === 20
}

function getSubtestQuestionCount(subtest: string): number {
  const subtestCounts: Record<string, number> = {
    "Penalaran Umum": 30,
    "Pengetahuan dan Pemahaman Umum": 20,
    "Kemampuan Memahami Bacaan dan Menulis": 20,
    "Pengetahuan Kuantitatif": 20,
    "Literasi dalam Bahasa Indonesia": 30,
    "Literasi dalam Bahasa Inggris": 20,
    "Penalaran Matematika": 20,
  }
  return subtestCounts[subtest] || 20
}
