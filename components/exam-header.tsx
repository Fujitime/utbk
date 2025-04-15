"use client"

import { useState, useEffect } from "react"
import { Clock, User, School } from "lucide-react"
import { ExamTimer } from "@/components/exam-timer"
import { SubtestTimer } from "@/components/subtest-timer"

interface ExamHeaderProps {
  subtest: string
  questionNumber: number
  initialTime: number
  onTimeUpdate: (timeLeft: number) => void
  onTimeExpired: () => void
}

export function ExamHeader({ subtest, questionNumber, initialTime, onTimeUpdate, onTimeExpired }: ExamHeaderProps) {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container mx-auto p-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 w-full md:w-auto mb-2 md:mb-0">
            {userData && (
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 text-gray-500" />
                  <span className="font-medium">{userData.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <School className="h-3 w-3 text-gray-500" />
                  <span className="text-gray-600">{userData.school}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div>
              <h1 className="font-semibold text-sm md:text-base">{subtest}</h1>
              <p className="text-xs text-gray-500">Soal {questionNumber}</p>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-blue-600" />
                <ExamTimer initialTime={initialTime} onTimeUpdate={onTimeUpdate} onTimeExpired={onTimeExpired} />
              </div>
              <div className="text-xs text-gray-500">
                <SubtestTimer subtest={subtest} onTimeExpired={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
