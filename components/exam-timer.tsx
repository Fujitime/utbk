"use client"

import { useEffect, useState, useRef } from "react"

interface ExamTimerProps {
  initialTime: number // in seconds
  onTimeUpdate: (timeLeft: number) => void
  onTimeExpired: () => void
}

export function ExamTimer({ initialTime, onTimeUpdate, onTimeExpired }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const startTimeRef = useRef(Date.now())
  const endTimeRef = useRef(Date.now() + initialTime * 1000)

  useEffect(() => {
    // Store the start time and end time in state
    startTimeRef.current = Date.now()
    endTimeRef.current = startTimeRef.current + initialTime * 1000

    // Use requestAnimationFrame for more accurate timing
    let animationFrameId: number

    const updateTimer = () => {
      const now = Date.now()
      const remaining = Math.max(0, Math.floor((endTimeRef.current - now) / 1000))

      setTimeLeft(remaining)

      // Call the update callback
      onTimeUpdate(remaining)

      // Check if time expired
      if (remaining <= 0) {
        onTimeExpired()
        return
      }

      // Continue the animation frame loop
      animationFrameId = requestAnimationFrame(updateTimer)
    }

    // Start the timer
    animationFrameId = requestAnimationFrame(updateTimer)

    // Save the start and end time to localStorage for persistence
    localStorage.setItem("examTimerStart", startTimeRef.current.toString())
    localStorage.setItem("examTimerEnd", endTimeRef.current.toString())

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [initialTime, onTimeUpdate, onTimeExpired])

  // Format time as HH:MM:SS
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

  // Determine color based on time left
  const getTimeColor = () => {
    if (timeLeft < 300) return "text-red-600" // Less than 5 minutes
    if (timeLeft < 600) return "text-yellow-600" // Less than 10 minutes
    return "text-blue-600"
  }

  return <div className={`font-mono font-semibold ${getTimeColor()}`}>{formatTime(timeLeft)}</div>
}

// Add a function to restore timer state from localStorage
// Add this function after the component declaration
export function restoreTimerState(): number {
  const storedStartTime = localStorage.getItem("examTimerStart")
  const storedEndTime = localStorage.getItem("examTimerEnd")

  if (storedStartTime && storedEndTime) {
    const startTime = Number.parseInt(storedStartTime)
    const endTime = Number.parseInt(storedEndTime)
    const now = Date.now()

    // Calculate remaining time in seconds
    const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
    return remaining
  }

  return 0
}
