"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import { MathJax, MathJaxContext } from "better-react-mathjax"

interface QuestionRendererProps {
  question: any
  selectedAnswer: string | string[]
  onAnswerSelect: (value: string | string[]) => void
  flagged: boolean
  onToggleFlag: () => void
  currentSubtest: string
  currentQuestionIndex: number
}

// Fix potential overflow issues in the question renderer
export function QuestionRenderer({
  question,
  selectedAnswer,
  onAnswerSelect,
  flagged,
  onToggleFlag,
  currentSubtest,
  currentQuestionIndex,
}: QuestionRendererProps) {
  const [localSelectedAnswers, setLocalSelectedAnswers] = useState<string[]>([])
  const [numericAnswer, setNumericAnswer] = useState("")

  // Initialize local state based on props
  useEffect(() => {
    if (question.type === "multiple") {
      setLocalSelectedAnswers(Array.isArray(selectedAnswer) ? selectedAnswer : [])
    } else if (question.type === "numeric") {
      setNumericAnswer((selectedAnswer as string) || "")
    }
  }, [question, selectedAnswer])

  // Handle checkbox change for multiple-choice questions
  const handleCheckboxChange = (value: string) => {
    const updatedAnswers = localSelectedAnswers.includes(value)
      ? localSelectedAnswers.filter((item) => item !== value)
      : [...localSelectedAnswers, value]

    setLocalSelectedAnswers(updatedAnswers)
    onAnswerSelect(updatedAnswers)
  }

  // Handle numeric input change
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNumericAnswer(value)
    onAnswerSelect(value)
  }

  // Determine if the question has an image
  const hasImage = question.image || question.diagram || question.map

  // Config for MathJax
  const mathJaxConfig = {
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Soal {currentQuestionIndex}</h2>
        <Button
          variant={flagged ? "destructive" : "outline"}
          size="sm"
          onClick={onToggleFlag}
          className="flex items-center gap-1"
        >
          <Flag className="h-4 w-4" />
          {flagged ? "Ditandai" : "Tandai Ragu"}
        </Button>
      </div>

      {/* Question text with MathJax support */}
      <MathJaxContext config={mathJaxConfig}>
        <div className="text-gray-800 mb-4 break-words">
          <MathJax>{question.text}</MathJax>
        </div>

        {/* Image/Diagram/Map rendering */}
        {hasImage && (
          <div className="my-4 flex justify-center">
            <div className="relative max-w-full overflow-auto">
              <Image
                src={question.image || question.diagram || question.map}
                alt={question.image || question.diagram || question.map}
                width={600}
                height={400}
                className="object-contain rounded-md border border-gray-200 max-w-full"
              />
            </div>
          </div>
        )}

        {/* Render different question types */}
        {question.type === "multiple" ? (
          // Multiple choice (checkbox)
          <div className="space-y-3">
            {question.options && question.options.length > 0 ? (
              question.options.map((option: any) => (
                <div
                  key={option.id}
                  className={cn(
                    "flex items-center rounded-lg border p-4 transition-colors duration-300 question-interaction",
                    localSelectedAnswers.includes(option.id) && "bg-blue-50 border-blue-200",
                  )}
                >
                  <Checkbox
                    id={`option-${option.id}`}
                    checked={localSelectedAnswers.includes(option.id)}
                    onCheckedChange={() => handleCheckboxChange(option.id)}
                    className="mr-3 question-interaction"
                  />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="w-full cursor-pointer question-interaction break-words"
                  >
                    <MathJax>
                      <span className="font-semibold mr-2">{option.id}.</span> {option.text}
                    </MathJax>
                  </Label>
                </div>
              ))
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-700">Tidak ada pilihan jawaban tersedia untuk soal ini.</p>
              </div>
            )}
          </div>
        ) : question.type === "numeric" ? (
          // Numeric input
          <div className="space-y-3">
            <Label htmlFor="numeric-answer">Jawaban (angka):</Label>
            <Input
              id="numeric-answer"
              type="number"
              value={numericAnswer}
              onChange={handleNumericChange}
              placeholder="Masukkan jawaban numerik"
              className="max-w-xs question-interaction"
            />
          </div>
        ) : (
          // Standard single-choice radio buttons
          <RadioGroup value={selectedAnswer as string} onValueChange={onAnswerSelect} className="space-y-3">
            {question.options && question.options.length > 0 ? (
              question.options.map((option: any) => (
                <div
                  key={option.id}
                  onClick={() => onAnswerSelect(option.id)}
                  className={cn(
                    "flex items-center rounded-lg border p-4 transition-colors duration-300 question-interaction",
                    selectedAnswer === option.id && "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
                  )}
                  data-state={selectedAnswer === option.id ? "selected" : "unselected"}
                >
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} className="mr-3 question-interaction" />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="w-full cursor-pointer question-interaction break-words"
                  >
                    <MathJax>
                      <span className="font-semibold mr-2">{option.id}.</span> {option.text}
                    </MathJax>
                  </Label>
                </div>
              ))
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-700">Tidak ada pilihan jawaban tersedia untuk soal ini.</p>
              </div>
            )}
          </RadioGroup>
        )}
      </MathJaxContext>
    </div>
  )
}
