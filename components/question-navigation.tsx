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
}

export function QuestionNavigation({
  session,
  currentSubtest,
  currentQuestionIndex,
  onNavigate,
}: QuestionNavigationProps) {
  const [activeTab, setActiveTab] = useState(currentSubtest)

  // Get flagged questions
  const flaggedQuestions = JSON.parse(localStorage.getItem("flaggedQuestions") || "{}")

  // Subtest info
  const subtestInfo: Record<string, number> = {
    "Penalaran Umum": 30,
    "Pengetahuan dan Pemahaman Umum": 20,
    "Kemampuan Memahami Bacaan dan Menulis": 20,
    "Pengetahuan Kuantitatif": 20,
    "Literasi dalam Bahasa Indonesia": 30,
    "Literasi dalam Bahasa Inggris": 20,
    "Penalaran Matematika": 20,
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

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

  return (
    <Card className="sticky top-20">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Navigasi Soal</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue={currentSubtest} value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 h-auto mb-4">
            {Object.keys(subtestInfo)
              .slice(0, 4)
              .map((subtest) => (
                <TabsTrigger key={subtest} value={subtest} className="text-xs py-1 px-2 h-auto">
                  {subtest.split(" ")[0]}
                </TabsTrigger>
              ))}
          </TabsList>
          <TabsList className="grid grid-cols-3 h-auto mb-4">
            {Object.keys(subtestInfo)
              .slice(4)
              .map((subtest) => (
                <TabsTrigger key={subtest} value={subtest} className="text-xs py-1 px-2 h-auto">
                  {subtest.split(" ")[0]}
                </TabsTrigger>
              ))}
          </TabsList>

          {Object.keys(subtestInfo).map((subtest) => (
            <TabsContent key={subtest} value={subtest} className="mt-0">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: subtestInfo[subtest] }, (_, i) => i + 1).map((questionIndex) => (
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
