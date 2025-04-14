import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { mockQuestions } from "./mock-questions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to get a complete set of questions for a subtest
export function getSubtestQuestions(subtest: string, count: number): any[] {
  const availableQuestions = mockQuestions[subtest] || []

  // If we have enough questions, return the requested count
  if (availableQuestions.length >= count) {
    return availableQuestions.slice(0, count).map((q, index) => ({
      ...q,
      id: index + 1, // Ensure IDs are sequential starting from 1
    }))
  }

  // Otherwise, return all available questions
  return availableQuestions.map((q, index) => ({
    ...q,
    id: index + 1, // Ensure IDs are sequential starting from 1
  }))
}
