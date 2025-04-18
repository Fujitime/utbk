"use client"

import { useEffect, useState, useRef } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Move these functions outside the component
export function clearSubtestTimerData(subtest: string) {
  localStorage.removeItem(`subtestTimer_${subtest}_start`)
  localStorage.removeItem(`subtestTimer_${subtest}_end`)
}

export function clearAllSubtestTimerData() {
  const subtests = [
    "Penalaran Umum",
    "Pengetahuan dan Pemahaman Umum",
    "Kemampuan Memahami Bacaan dan Menulis",
    "Pengetahuan Kuantitatif",
    "Literasi dalam Bahasa Indonesia",
    "Literasi dalam Bahasa Inggris",
    "Penalaran Matematika",
  ]

  subtests.forEach((subtest) => {
    clearSubtestTimerData(subtest)
  })
}

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
  const lastUpdateRef = useRef<number>(Date.now())

  // Update the useEffect to check if we should reset the timer
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Get stored timer state or calculate new time
    let startTime: number
    let endTime: number
    let currentTimeLeft: number
    const now = Date.now()

    const timerKey = `subtestTimer_${subtest}`
    const storedStartTime = localStorage.getItem(`${timerKey}_start`)
    const storedEndTime = localStorage.getItem(`${timerKey}_end`)

    // Check if we should use stored time or reset
    // If the subtest has changed, we should reset the timer
    const shouldResetTimer = () => {
      if (!storedStartTime || !storedEndTime) return true

      const storedEndTimeNum = Number.parseInt(storedEndTime, 10)
      const remainingTime = Math.max(0, Math.floor((storedEndTimeNum - now) / 1000))

      // If the difference is more than 2 minutes (120 seconds), reset the timer
      return Math.abs(remainingTime - initialTime) > 120
    }

    if (storedStartTime && storedEndTime && !shouldResetTimer()) {
      // Resume from stored state
      startTime = Number.parseInt(storedStartTime, 10)
      endTime = Number.parseInt(storedEndTime, 10)

      // Check if timer is still valid
      if (endTime > now) {
        currentTimeLeft = Math.max(0, Math.floor((endTime - now) / 1000))
      } else {
        // Timer expired, use initial time
        currentTimeLeft = initialTime
        startTime = now
        endTime = now + initialTime * 1000

        // Save new timer state
        localStorage.setItem(`${timerKey}_start`, startTime.toString())
        localStorage.setItem(`${timerKey}_end`, endTime.toString())
      }
    } else {
      // No stored timer or should reset, create new one
      currentTimeLeft = initialTime
      startTime = now
      endTime = now + initialTime * 1000

      // Save new timer state
      localStorage.setItem(`${timerKey}_start`, startTime.toString())
      localStorage.setItem(`${timerKey}_end`, endTime.toString())
    }

    // Set initial time left
    setTimeLeft(currentTimeLeft)
    setShowWarning(currentTimeLeft <= 120 && currentTimeLeft > 0)
    lastUpdateRef.current = now

    // Set up interval for timer
    timerRef.current = setInterval(() => {
      const currentTime = Date.now()
      const elapsedSinceLastUpdate = Math.floor((currentTime - lastUpdateRef.current) / 1000)

      // Only update if at least 1 second has passed
      if (elapsedSinceLastUpdate >= 1) {
        const remaining = Math.max(0, Math.floor((endTime - currentTime) / 1000))

        setTimeLeft(remaining)
        lastUpdateRef.current = currentTime

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
      }
    }, 500) // Check more frequently to avoid drift

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [subtest, initialTime, onTimeExpired])

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

// Improved function to restore timer state from localStorage
export function restoreSubtestTimerState(subtest: string): number {
  try {
    const timerKey = `subtestTimer_${subtest}`
    const storedStartTime = localStorage.getItem(`${timerKey}_start`)
    const storedEndTime = localStorage.getItem(`${timerKey}_end`)

    if (storedStartTime && storedEndTime) {
      const startTime = Number.parseInt(storedStartTime, 10)
      const endTime = Number.parseInt(storedEndTime, 10)
      const now = Date.now()

      if (endTime > now) {
        return Math.max(0, Math.floor((endTime - now) / 1000))
      }
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
