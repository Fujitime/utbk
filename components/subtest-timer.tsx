"use client"

import { useEffect, useState, useRef } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SubtestTimerProps {
  subtest: string
  onTimeExpired: () => void
}

export function SubtestTimer({ subtest, onTimeExpired }: SubtestTimerProps) {
  // Define duration for each subtest in minutes
  const subtestDurations: Record<string, number> = {
    "Penalaran Umum": 30,
    "Pengetahuan dan Pemahaman Umum": 15,
    "Kemampuan Memahami Bacaan dan Menulis": 25,
    "Pengetahuan Kuantitatif": 20,
    "Literasi dalam Bahasa Indonesia": 45,
    "Literasi dalam Bahasa Inggris": 30,
    "Penalaran Matematika": 20,
  }

  // Get duration for current subtest with fallback
  const duration = subtestDurations[subtest] || 30

  // Convert to seconds
  const initialTime = duration * 60

  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [showWarning, setShowWarning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Get stored timer state or calculate new time
    let startTime: number
    let endTime: number
    let initialTimeLeft: number

    const storedStartTime = localStorage.getItem(`subtestTimer_${subtest}_start`)
    const storedEndTime = localStorage.getItem(`subtestTimer_${subtest}_end`)

    if (storedStartTime && storedEndTime) {
      // Resume from stored state
      startTime = Number.parseInt(storedStartTime)
      endTime = Number.parseInt(storedEndTime)
      initialTimeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
    } else {
      // Create new timer
      startTime = Date.now()
      endTime = startTime + (subtestDurations[subtest] * 60 * 1000 || 30 * 60 * 1000)
      initialTimeLeft = subtestDurations[subtest] * 60 || 30 * 60

      // Save to localStorage
      localStorage.setItem(`subtestTimer_${subtest}_start`, startTime.toString())
      localStorage.setItem(`subtestTimer_${subtest}_end`, endTime.toString())
    }

    // Set initial time left
    setTimeLeft(initialTimeLeft)
    setShowWarning(initialTimeLeft <= 120 && initialTimeLeft > 0)

    // Set up interval for timer
    timerRef.current = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000))

      setTimeLeft(remaining)

      // Show warning when less than 2 minutes remaining
      if (remaining <= 120 && remaining > 0 && !showWarning) {
        setShowWarning(true)
      }

      // Check if time expired
      if (remaining <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
        onTimeExpired()
      }
    }, 1000)

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [subtest, onTimeExpired])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Determine color based on time left
  const getTimeColor = () => {
    if (timeLeft < 60) return "text-red-600" // Less than 1 minute
    if (timeLeft < 300) return "text-yellow-600" // Less than 5 minutes
    return "text-green-600"
  }

  return (
    <div>
      <div className={`font-mono font-semibold ${getTimeColor()}`}>{formatTime(timeLeft)}</div>

      {showWarning && (
        <Alert className="mt-2 bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-600 text-sm">
            Waktu untuk subtes {subtest} akan segera habis!
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

// Function to restore timer state from localStorage
export function restoreSubtestTimerState(subtest: string): number {
  try {
    const storedStartTime = localStorage.getItem(`subtestTimer_${subtest}_start`)
    const storedEndTime = localStorage.getItem(`subtestTimer_${subtest}_end`)

    if (storedStartTime && storedEndTime) {
      const startTime = Number.parseInt(storedStartTime)
      const endTime = Number.parseInt(storedEndTime)
      const now = Date.now()

      // Calculate remaining time in seconds
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
      return remaining
    }
  } catch (error) {
    console.error("Error restoring subtest timer state:", error)
  }

  // Default durations in seconds
  const subtestDurations: Record<string, number> = {
    "Penalaran Umum": 30 * 60,
    "Pengetahuan dan Pemahaman Umum": 15 * 60,
    "Kemampuan Memahami Bacaan dan Menulis": 25 * 60,
    "Pengetahuan Kuantitatif": 20 * 60,
    "Literasi dalam Bahasa Indonesia": 45 * 60,
    "Literasi dalam Bahasa Inggris": 30 * 60,
    "Penalaran Matematika": 20 * 60,
  }

  return subtestDurations[subtest] || 30 * 60
}
