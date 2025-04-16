"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Progress } from "@/components/ui/progress"
import { QuestionNavigation } from "@/components/question-navigation"
import { QuestionRenderer } from "@/components/question-renderer"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ExamHeader } from "@/components/exam-header"

// Update the component to handle errors properly
export default function ExamPage() {
  const router = useRouter()
  const isMobile = useMobile()
  const [session, setSession] = useState<any>(null)
  const [currentSubtest, setCurrentSubtest] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>("")
  const [flagged, setFlagged] = useState(false)
  const [tabWarning, setTabWarning] = useState(false)
  const [idleWarning, setIdleWarning] = useState(false)
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [questionsLoaded, setQuestionsLoaded] = useState(false)
  const [lastIdleCheck, setLastIdleCheck] = useState(Date.now())
  const [availableQuestions, setAvailableQuestions] = useState<Record<string, number>>({})
  const [allowJumpSubtests, setAllowJumpSubtests] = useState(true)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  // Check if a question is answered
  const isAnswered = (subtest: string, questionIndex: number): boolean => {
    return (
      session &&
      session.subtes &&
      session.subtes[subtest] &&
      session.subtes[subtest].soalJawaban &&
      session.subtes[subtest].soalJawaban[questionIndex] !== undefined
    )
  }

  // Check if this is the last question
  const isLastQuestion = (
    subtest: string,
    questionIndex: number,
    availableQuestions: Record<string, number>,
    isPracticeMode: boolean,
  ): boolean => {
    if (isPracticeMode) {
      return questionIndex === (availableQuestions[subtest] || 0)
    }
    return subtest === "Penalaran Matematika" && questionIndex === (availableQuestions["Penalaran Matematika"] || 20)
  }

  // Load session from localStorage
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("tryoutSession")
      if (!savedSession) {
        router.push("/register")
        return
      }

      const parsedSession = JSON.parse(savedSession)
      setSession(parsedSession)
      setCurrentSubtest(parsedSession.currentSubtest || "Penalaran Umum")
      setCurrentQuestionIndex(parsedSession.currentQuestion || 1)

      // Check if questions are generated
      const questionsGenerated = localStorage.getItem("questionsGenerated")
      if (questionsGenerated !== "true") {
        router.push("/generate-questions")
        return
      }

      setQuestionsLoaded(true)

      // Load the current question
      loadQuestion(parsedSession.currentSubtest || "Penalaran Umum", parsedSession.currentQuestion || 1)

      // Count available questions for each subtest
      countAvailableQuestions()

      // Check if jumping between subtests is allowed
      const allowJump = localStorage.getItem("allowJumpSubtests") === "true"
      setAllowJumpSubtests(allowJump)

      setLoading(false)

      // Set up idle detection
      setupIdleDetection()

      // Set up tab change detection
      document.addEventListener("visibilitychange", handleVisibilityChange)

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
    } catch (error) {
      console.error("Error loading session:", error)
      setError("Terjadi kesalahan saat memuat sesi ujian. Silakan coba lagi.")
      setLoading(false)
    }
  }, [])

  // Fix the navigation between subtests and ensure all questions are loaded

  // Update the countAvailableQuestions function to properly count questions
  const countAvailableQuestions = () => {
    const subtests = [
      "Penalaran Umum",
      "Pengetahuan dan Pemahaman Umum",
      "Kemampuan Memahami Bacaan dan Menulis",
      "Pengetahuan Kuantitatif",
      "Literasi dalam Bahasa Indonesia",
      "Literasi dalam Bahasa Inggris",
      "Penalaran Matematika",
    ]

    const counts: Record<string, number> = {}

    subtests.forEach((subtest) => {
      try {
        const questionsJson = localStorage.getItem(`questions_${subtest}`)
        if (questionsJson) {
          const questions = JSON.parse(questionsJson)
          counts[subtest] = questions.length
        } else {
          counts[subtest] = 0
        }
      } catch (error) {
        console.error(`Error parsing questions for ${subtest}:`, error)
        counts[subtest] = 0
      }
    })

    setAvailableQuestions(counts)
  }

  // Load question data from localStorage
  const loadQuestion = (subtest: string, questionNumber: number) => {
    setLoading(true)

    try {
      // Get questions for this subtest from localStorage
      const questionsJson = localStorage.getItem(`questions_${subtest}`)

      if (!questionsJson) {
        throw new Error(`Soal untuk ${subtest} tidak ditemukan`)
      }

      const questions = JSON.parse(questionsJson)

      // Find the question by ID
      const question = questions.find((q: any) => q.id === questionNumber)

      if (!question) {
        // If question with exact ID not found, try to find the closest available question
        if (questions.length > 0) {
          // Sort questions by ID and find the closest one
          const sortedQuestions = [...questions].sort((a, b) => a.id - b.id)
          const closestQuestion = sortedQuestions.reduce((prev, curr) => {
            return Math.abs(curr.id - questionNumber) < Math.abs(prev.id - questionNumber) ? curr : prev
          })

          // Update current question index to match the found question
          setCurrentQuestionIndex(closestQuestion.id)

          // Update session
          if (session) {
            const updatedSession = { ...session }
            updatedSession.currentQuestion = closestQuestion.id
            localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))
            setSession(updatedSession)
          }

          setCurrentQuestion(closestQuestion)

          // Load saved answer if exists
          if (session && session.subtes[subtest].soalJawaban[closestQuestion.id]) {
            setSelectedAnswer(session.subtes[subtest].soalJawaban[closestQuestion.id])
          } else {
            setSelectedAnswer(closestQuestion.type === "multiple" ? [] : "")
          }

          // Load flagged status
          const flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions") || "{}")
          setFlagged(flaggedQuestions[`${subtest}-${closestQuestion.id}`] || false)

          setLoading(false)
          return
        }

        throw new Error(`Soal nomor ${questionNumber} untuk ${subtest} tidak ditemukan`)
      }

      setCurrentQuestion(question)

      // Load saved answer if exists
      if (session && session.subtes[subtest].soalJawaban[questionNumber]) {
        setSelectedAnswer(session.subtes[subtest].soalJawaban[questionNumber])
      } else {
        // Initialize based on question type
        setSelectedAnswer(question.type === "multiple" ? [] : "")
      }

      // Load flagged status
      const flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions") || "{}")
      setFlagged(flaggedQuestions[`${subtest}-${questionNumber}`] || false)
    } catch (error) {
      console.error("Error loading question:", error)
      // Set a placeholder question
      setCurrentQuestion({
        id: questionNumber,
        text: `Terjadi kesalahan saat memuat soal ${questionNumber} untuk ${subtest}. Silakan coba refresh halaman.`,
        type: "single",
        options: [
          { id: "A", text: "Opsi A" },
          { id: "B", text: "Opsi B" },
          { id: "C", text: "Opsi C" },
          { id: "D", text: "Opsi D" },
        ],
      })
    }

    setLoading(false)
  }

  // Handle visibility change (tab switching)
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      setTabWarning(true)
    }
  }

  // Fix the idle detection to avoid false positives
  // Replace the setupIdleDetection function with this improved version:

  // Improve the idle detection logic to prevent false positives
  // Fix the timer reset issue when navigating between questions

  // Update the setupIdleDetection function to be more accurate
  const setupIdleDetection = () => {
    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer)

      // Only set a new idle timer if we're not already showing the warning
      if (!idleWarning) {
        // Use a longer timeout (10 minutes instead of 5)
        setIdleTimer(
          setTimeout(
            () => {
              // Check if there's been any user activity in the last 5 minutes
              // before showing the warning
              const now = Date.now()
              if (now - lastIdleCheck > 5 * 60 * 1000) {
                setIdleWarning(true)
              }
            },
            10 * 60 * 1000,
          ), // 10 minutes
        )
      }

      // Update the last activity timestamp
      setLastIdleCheck(Date.now())
    }

    // Track more user events to better detect activity
    const events = [
      "mousedown",
      "mousemove",
      "mouseup",
      "keydown",
      "keypress",
      "keyup",
      "touchstart",
      "touchmove",
      "touchend",
      "scroll",
      "click",
      "focus",
      "blur",
    ]

    // Add event listeners with a debounce mechanism
    let debounceTimer: NodeJS.Timeout | null = null
    const debouncedResetTimer = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(resetIdleTimer, 1000) // 1 second debounce
    }

    events.forEach((event) => {
      document.addEventListener(event, debouncedResetTimer, { passive: true })
    })

    // Initial setup
    resetIdleTimer()

    // Cleanup
    return () => {
      if (idleTimer) clearTimeout(idleTimer)
      if (debounceTimer) clearTimeout(debounceTimer)
      events.forEach((event) => {
        document.removeEventListener(event, debouncedResetTimer)
      })
    }
  }

  // Save answer to localStorage
  const saveAnswer = (answer: string | string[]) => {
    if (!session) return

    const updatedSession = { ...session }
    updatedSession.subtes[currentSubtest].soalJawaban[currentQuestionIndex] = answer

    localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))
    setSession(updatedSession)
  }

  // Handle answer selection
  const handleAnswerSelect = (value: string | string[]) => {
    setSelectedAnswer(value)
    saveAnswer(value)
  }

  // Update the handleNextQuestion function to properly navigate between subtests
  const handleNextQuestion = () => {
    // Check if this is a mini practice session
    const isPracticeMode = session?.isPracticeMode === true

    if (isPracticeMode) {
      // In practice mode, only navigate within the current subtest
      const subtestQuestionCount = availableQuestions[currentSubtest] || 0

      if (currentQuestionIndex < subtestQuestionCount) {
        // Move to next question in current subtest
        const nextIndex = currentQuestionIndex + 1
        setCurrentQuestionIndex(nextIndex)

        // Update session
        const updatedSession = { ...session }
        updatedSession.currentQuestion = nextIndex
        localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))

        // Load the next question
        loadQuestion(currentSubtest, nextIndex)
      } else {
        // End of practice, navigate to confirmation page
        router.push("/confirm")
      }
      return
    }

    // Regular exam mode
    // Get the current subtest's question count
    const subtestInfo: Record<string, { count: number; nextSubtest: string | null }> = {
      "Penalaran Umum": {
        count: availableQuestions["Penalaran Umum"] || 30,
        nextSubtest: "Pengetahuan dan Pemahaman Umum",
      },
      "Pengetahuan dan Pemahaman Umum": {
        count: availableQuestions["Pengetahuan dan Pemahaman Umum"] || 20,
        nextSubtest: "Kemampuan Memahami Bacaan dan Menulis",
      },
      "Kemampuan Memahami Bacaan dan Menulis": {
        count: availableQuestions["Kemampuan Memahami Bacaan dan Menulis"] || 20,
        nextSubtest: "Pengetahuan Kuantitatif",
      },
      "Pengetahuan Kuantitatif": {
        count: availableQuestions["Pengetahuan Kuantitatif"] || 20,
        nextSubtest: "Literasi dalam Bahasa Indonesia",
      },
      "Literasi dalam Bahasa Indonesia": {
        count: availableQuestions["Literasi dalam Bahasa Indonesia"] || 30,
        nextSubtest: "Literasi dalam Bahasa Inggris",
      },
      "Literasi dalam Bahasa Inggris": {
        count: availableQuestions["Literasi dalam Bahasa Inggris"] || 20,
        nextSubtest: "Penalaran Matematika",
      },
      "Penalaran Matematika": { count: availableQuestions["Penalaran Matematika"] || 20, nextSubtest: null },
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

  // Update the handlePrevQuestion function to properly navigate between subtests
  const handlePrevQuestion = () => {
    // Check if this is a mini practice session
    const isPracticeMode = session?.isPracticeMode === true

    if (isPracticeMode) {
      // In practice mode, only navigate within the current subtest
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
      }
      return
    }

    // Regular exam mode
    // Get the previous subtest's info
    const subtestInfo: Record<string, { count: number; prevSubtest: string | null }> = {
      "Penalaran Umum": { count: availableQuestions["Penalaran Umum"] || 30, prevSubtest: null },
      "Pengetahuan dan Pemahaman Umum": {
        count: availableQuestions["Pengetahuan dan Pemahaman Umum"] || 20,
        prevSubtest: "Penalaran Umum",
      },
      "Kemampuan Memahami Bacaan dan Menulis": {
        count: availableQuestions["Kemampuan Memahami Bacaan dan Menulis"] || 20,
        prevSubtest: "Pengetahuan dan Pemahaman Umum",
      },
      "Pengetahuan Kuantitatif": {
        count: availableQuestions["Pengetahuan Kuantitatif"] || 20,
        prevSubtest: "Kemampuan Memahami Bacaan dan Menulis",
      },
      "Literasi dalam Bahasa Indonesia": {
        count: availableQuestions["Literasi dalam Bahasa Indonesia"] || 30,
        prevSubtest: "Pengetahuan Kuantitatif",
      },
      "Literasi dalam Bahasa Inggris": {
        count: availableQuestions["Literasi dalam Bahasa Inggris"] || 20,
        prevSubtest: "Literasi dalam Bahasa Indonesia",
      },
      "Penalaran Matematika": {
        count: availableQuestions["Penalaran Matematika"] || 20,
        prevSubtest: "Literasi dalam Bahasa Inggris",
      },
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
    } else if (currentInfo.prevSubtest && allowJumpSubtests) {
      // Only allow jumping to previous subtest if allowed
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

  // Navigate to specific question
  const handleNavigate = (subtest: string, questionIndex: number) => {
    setCurrentSubtest(subtest)
    setCurrentQuestionIndex(questionIndex)

    // Update session
    const updatedSession = { ...session }
    updatedSession.currentSubtest = subtest
    updatedSession.currentQuestion = questionIndex
    localStorage.setItem("tryoutSession", JSON.stringify(updatedSession))

    // Load the question
    loadQuestion(subtest, questionIndex)

    // Close the mobile navigation sheet if open
    setSheetOpen(false)
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

  // Handle exit confirmation
  const handleExitExam = () => {
    setShowExitConfirm(true)
  }

  // Confirm exit and go back to home
  const confirmExit = () => {
    router.push("/")
  }

  // Return with error handling
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push("/register")}>Kembali ke Halaman Utama</Button>
      </div>
    )
  }

  if (loading && !questionsLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const isAnsweredComponent = (subtest: string, questionIndex: number): boolean => {
    return session?.subtes?.[subtest]?.soalJawaban?.[questionIndex] !== undefined
  }

  return (
    <div id="exam-container" className="min-h-screen bg-white">
      {/* Header with timer and subtest info */}
      <ExamHeader
        subtest={currentSubtest}
        questionNumber={currentQuestionIndex}
        onTimeUpdate={handleTimeUpdate}
        onTimeExpired={handleTimeExpired}
        initialTime={session?.timeLeft || 0}
      />

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
            Tidak ada aktivitas selama 5 menit. Apakah Anda masih mengerjakan ujian?
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
        {/* Back button */}
        <div className="flex justify-between mb-4">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleExitExam}>
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Menu
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => router.push("/confirm")}
          >
            Selesai Ujian
          </Button>
        </div>

        {/* Mobile navigation - visible only on mobile */}
        {isMobile && (
          <div className="mb-4 bg-white p-3 rounded-lg shadow-md">
            <h3 className="font-medium text-xs mb-2">Navigasi Soal</h3>
            <div className="grid grid-cols-6 gap-1 overflow-x-auto pb-2">
              {Array.from({ length: Math.min(12, availableQuestions[currentSubtest] || 0) }, (_, i) => i + 1).map(
                (questionIndex) => (
                  <Button
                    key={questionIndex}
                    variant="outline"
                    size="sm"
                    className={`h-7 w-7 p-0 font-normal text-xs ${
                      questionIndex === currentQuestionIndex
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : isAnswered(currentSubtest, questionIndex)
                          ? "bg-green-100 border-green-300 hover:bg-green-200"
                          : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => handleNavigate(currentSubtest, questionIndex)}
                  >
                    {questionIndex}
                  </Button>
                ),
              )}
              {availableQuestions[currentSubtest] > 12 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 font-normal text-xs"
                  onClick={() => setSheetOpen(true)}
                >
                  ...
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Full navigation sheet for mobile */}
        {isMobile && (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="bottom" className="h-[80vh]">
              {session && (
                <QuestionNavigation
                  session={session}
                  currentSubtest={currentSubtest}
                  currentQuestionIndex={currentQuestionIndex}
                  onNavigate={handleNavigate}
                  availableQuestions={availableQuestions}
                  isPracticeMode={session.isPracticeMode === true}
                  allowJumpSubtests={allowJumpSubtests}
                />
              )}
            </SheetContent>
          </Sheet>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Question content */}
          <div className="md:col-span-2">
            {/* Question card */}
            <Card className="p-6">
              <CardContent className="p-0">
                {currentQuestion && (
                  <QuestionRenderer
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    onAnswerSelect={handleAnswerSelect}
                    flagged={flagged}
                    onToggleFlag={toggleFlag}
                    currentSubtest={currentSubtest}
                    currentQuestionIndex={currentQuestionIndex}
                  />
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevQuestion}
                    disabled={
                      (currentSubtest === "Penalaran Umum" && currentQuestionIndex === 1) ||
                      (session?.isPracticeMode && currentQuestionIndex === 1)
                    }
                  >
                    Sebelumnya
                  </Button>
                  <Button onClick={handleNextQuestion}>
                    {isLastQuestion(
                      currentSubtest,
                      currentQuestionIndex,
                      availableQuestions,
                      session?.isPracticeMode === true,
                    )
                      ? "Selesai"
                      : "Selanjutnya"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress indicator */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{currentSubtest}</span>
                <span className="text-sm text-gray-500">
                  {currentQuestionIndex} dari {availableQuestions[currentSubtest] || 0}
                </span>
              </div>
              <Progress
                value={(currentQuestionIndex / (availableQuestions[currentSubtest] || 1)) * 100}
                className="h-2"
              />
            </div>
          </div>

          {/* Question navigation sidebar - only visible on desktop */}
          <div className="hidden md:block">
            {session && (
              <QuestionNavigation
                session={session}
                currentSubtest={currentSubtest}
                currentQuestionIndex={currentQuestionIndex}
                onNavigate={handleNavigate}
                availableQuestions={availableQuestions}
                isPracticeMode={session.isPracticeMode === true}
                allowJumpSubtests={allowJumpSubtests}
              />
            )}
          </div>
        </div>
      </main>

      {/* Exit confirmation dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Keluar</h3>
            <p className="mb-6">
              Anda yakin ingin keluar dari ujian? Progress Anda akan tetap tersimpan, tetapi timer akan terus berjalan.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowExitConfirm(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={confirmExit}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
