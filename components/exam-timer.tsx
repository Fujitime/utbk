"use client"

import { useEffect, useState, useRef } from "react"

// Move the function outside the component
export function clearExamTimerData() {
  localStorage.removeItem("examTimerStart")
  localStorage.removeItem("examTimerEnd")
}

interface ExamTimerProps {
  initialTime: number
  onTimeUpdate: (timeLeft: number) => void
  onTimeExpired: () => void
}

export function ExamTimer({ initialTime, onTimeUpdate, onTimeExpired }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime || 3600) // Default to 1 hour
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateRef = useRef<number>(Date.now())

  // Update the useEffect to check if initialTime has changed significantly
  useEffect(() => {
    // Clear timer before setting up a new one
    if (timerRef.current) clearInterval(timerRef.current)

    // Get stored timer state or calculate new time
    let startTime: number
    let endTime: number
    let currentTimeLeft: number

    const storedStartTime = localStorage.getItem("examTimerStart")
    const storedEndTime = localStorage.getItem("examTimerEnd")
    const now = Date.now()

    // Check if we should use stored time or reset
    // If initialTime is significantly different from stored remaining time, reset the timer
    const shouldResetTimer = () => {
      if (!storedStartTime || !storedEndTime) return true

      const storedEndTimeNum = Number.parseInt(storedEndTime, 10)
      const remainingTime = Math.max(0, Math.floor((storedEndTimeNum - now) / 1000))

      // If the difference is more than 5 minutes (300 seconds), reset the timer
      return Math.abs(remainingTime - initialTime) > 300
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
        currentTimeLeft = initialTime > 0 ? initialTime : 3600
        startTime = now
        endTime = now + currentTimeLeft * 1000

        // Save new timer state
        localStorage.setItem("examTimerStart", startTime.toString())
        localStorage.setItem("examTimerEnd", endTime.toString())
      }
    } else {
      // No stored timer or should reset, create new one
      currentTimeLeft = initialTime > 0 ? initialTime : 3600
      startTime = now
      endTime = now + currentTimeLeft * 1000

      // Save new timer state
      localStorage.setItem("examTimerStart", startTime.toString())
      localStorage.setItem("examTimerEnd", endTime.toString())
    }

    // Set initial time left
    setTimeLeft(currentTimeLeft)
    lastUpdateRef.current = now

    // Start interval to update timer
    timerRef.current = setInterval(() => {
      const currentTime = Date.now()
      const elapsedSinceLastUpdate = Math.floor((currentTime - lastUpdateRef.current) / 1000)

      // Only update if at least 1 second has passed
      if (elapsedSinceLastUpdate >= 1) {
        const remaining = Math.max(0, Math.floor((endTime - currentTime) / 1000))

        setTimeLeft(remaining)
        onTimeUpdate(remaining)
        lastUpdateRef.current = currentTime

        if (remaining <= 0) {
          if (timerRef.current) clearInterval(timerRef.current)
          onTimeExpired()
        }
      }
    }, 500) // Check more frequently to avoid drift

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [initialTime, onTimeUpdate, onTimeExpired])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":")
  }

  const getTimeColor = () => {
    if (timeLeft < 300) return "text-red-600" // < 5 menit
    if (timeLeft < 600) return "text-yellow-600" // < 10 menit
    return "text-blue-600"
  }

  return <div className={`font-mono font-semibold ${getTimeColor()}`}>{formatTime(timeLeft)}</div>
}

// Improved function to restore timer state from localStorage
export function restoreTimerState(): number {
  try {
    const storedStartTime = localStorage.getItem("examTimerStart")
    const storedEndTime = localStorage.getItem("examTimerEnd")

    if (storedStartTime && storedEndTime) {
      const startTime = Number.parseInt(storedStartTime, 10)
      const endTime = Number.parseInt(storedEndTime, 10)
      const now = Date.now()

      if (endTime > now) {
        return Math.max(0, Math.floor((endTime - now) / 1000))
      }
    }
  } catch (error) {
    console.error("Error restoring timer state:", error)
  }

  return 3600 // fallback
}
