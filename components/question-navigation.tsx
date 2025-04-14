"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QuestionNavigationProps {
  session: any
  currentSubtest: string
  currentQuestionIndex: number
  onNavigate: (subtest: string, questionIndex: number) => void
  availableQuestions: Record<string, number>
  isPracticeMode?: boolean
  allowJumpSubtests?: boolean
}

export function QuestionNavigation({
  session,
  currentSubtest,
  currentQuestionIndex,
  onNavigate,
  availableQuestions,
  isPracticeMode = false,
  allowJumpSubtests = true,
}: QuestionNavigationProps) {
  const [activeTab, setActiveTab] = useState(currentSubtest)

  // Get flagged questions
  const flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions") || "{}")

  // Check if a question is answered
  const isAnswered = (subtest: string, questionIndex: number) => {
    return (
      session &&
      session.subtes[subtest] &&
      session.subtes[subtest].soalJawaban &&
      session.subtes[subtest].soalJawaban[questionIndex] !== undefined
    )
  }

  // Check if a question is flagged
  const isFlagged = (subtest: string, questionIndex: number) => {
    return flaggedQuestions[`${subtest}-${questionIndex}`] === true
  }

  // Get button style based on question state
  const getButtonStyle = (subtest: string, questionIndex: number) => {
    const isActive = subtest === currentSubtest && questionIndex === currentQuestionIndex
    const answered = isAnswered(subtest, questionIndex)
    const flagged = isFlagged(subtest, questionIndex)

    if (isActive) {
      return "bg-blue-600 text-white hover:bg-blue-700"
    }

    if (flagged) {
      return answered
        ? "bg-yellow-100 border-yellow-300 hover:bg-yellow-200"
        : "bg-yellow-100 border-yellow-300 hover:bg-yellow-200"
    }

    return answered ? "bg-green-100 border-green-300 hover:bg-green-200" : "bg-white hover:bg-gray-100"
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (!allowJumpSubtests && value !== currentSubtest) {
      // If jumping between subtests is not allowed, don't change the tab
      return
    }
    setActiveTab(value)
    // If jumping is allowed, navigate to the first question of the selected subtest
    if (allowJumpSubtests) {
      onNavigate(value, 1)
    }
  }

  // Get subtests to display
  const getSubtestsToDisplay = () => {
    if (isPracticeMode) {
      // In practice mode, only show the current subtest
      return [currentSubtest]
    } else {
      // In full exam mode, show all subtests
      return Object.keys(availableQuestions)
    }
  }

  const subtestsToDisplay = getSubtestsToDisplay()

  return (
    <Card className="sticky top-20">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Navigasi Soal</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {!isPracticeMode && (
          <Tabs defaultValue={currentSubtest} value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 h-auto mb-4">
              {subtestsToDisplay.slice(0, Math.min(4, subtestsToDisplay.length)).map((subtest) => (
                <TabsTrigger
                  key={subtest}
                  value={subtest}
                  className="text-xs py-1 px-2 h-auto"
                  disabled={!allowJumpSubtests && subtest !== currentSubtest}
                >
                  {subtest.split(" ")[0]}
                  {subtest.includes("Pengetahuan") && !subtest.includes("Kuantitatif") ? " & Pemahaman" : ""}
                </TabsTrigger>
              ))}
            </TabsList>
            {subtestsToDisplay.length > 4 && (
              <TabsList className="grid grid-cols-3 h-auto mb-4">
                {subtestsToDisplay.slice(4).map((subtest) => (
                  <TabsTrigger
                    key={subtest}
                    value={subtest}
                    className="text-xs py-1 px-2 h-auto"
                    disabled={!allowJumpSubtests && subtest !== currentSubtest}
                  >
                    {subtest.split(" ")[0]}
                    {subtest === "Literasi dalam Bahasa Indonesia" ? " B.Indo" : ""}
                    {subtest === "Literasi dalam Bahasa Inggris" ? " B.Inggris" : ""}
                  </TabsTrigger>
                ))}
              </TabsList>
            )}

            {subtestsToDisplay.map((subtest) => (
              <TabsContent key={subtest} value={subtest} className="mt-0">
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: availableQuestions[subtest] || 0 }, (_, i) => i + 1).map((questionIndex) => (
                    <Button
                      key={questionIndex}
                      variant="outline"
                      size="sm"
                      className={`h-8 w-8 p-0 font-normal ${getButtonStyle(subtest, questionIndex)}`}
                      onClick={() => onNavigate(subtest, questionIndex)}
                    >
                      {questionIndex}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* For practice mode, just show the questions for the current subtest */}
        {isPracticeMode && (
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: availableQuestions[currentSubtest] || 0 }, (_, i) => i + 1).map((questionIndex) => (
              <Button
                key={questionIndex}
                variant="outline"
                size="sm"
                className={`h-8 w-8 p-0 font-normal ${getButtonStyle(currentSubtest, questionIndex)}`}
                onClick={() => onNavigate(currentSubtest, questionIndex)}
              >
                {questionIndex}
              </Button>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-white border rounded"></div>
            <span>Belum dijawab</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Sudah dijawab</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>Ditandai ragu</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span>Soal aktif</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
