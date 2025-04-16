import { useEffect, useState, useRef } from "react"

interface ExamTimerProps {
  initialTime: number
  onTimeUpdate: (timeLeft: number) => void
  onTimeExpired: () => void
  storageKey: string // 💡 new
}

export function ExamTimer({ initialTime, onTimeUpdate, onTimeExpired }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime || 3600) // Default to 1 hour
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const hasSavedToLocalRef = useRef(false) // Hindari overwrite localStorage saat re-render

  // Fungsi untuk reset timer
  const resetTimer = () => {
    localStorage.removeItem("examTimerStart")
    localStorage.removeItem("examTimerEnd")
  }

  useEffect(() => {
    // Reset timer sebelum memulai
    resetTimer()

    // Clear timer sebelumnya
    if (timerRef.current) clearInterval(timerRef.current)

    const validInitialTime = initialTime > 0 ? initialTime : 3600

    let startTime: number
    let endTime: number
    let initialTimeLeft: number

    const storedStartTime = localStorage.getItem("examTimerStart")
    const storedEndTime = localStorage.getItem("examTimerEnd")

    // Debug
    console.log({
      storedStartTime,
      storedEndTime,
      now: Date.now(),
    })

    if (storedStartTime && storedEndTime) {
      startTime = Number.parseInt(storedStartTime)
      endTime = Number.parseInt(storedEndTime)

      // Jika waktunya sudah lewat, reset timer
      if (endTime < Date.now()) {
        localStorage.removeItem("examTimerStart")
        localStorage.removeItem("examTimerEnd")

        startTime = Date.now()
        endTime = startTime + validInitialTime * 1000
        initialTimeLeft = validInitialTime
        localStorage.setItem("examTimerStart", startTime.toString())
        localStorage.setItem("examTimerEnd", endTime.toString())
      } else {
        initialTimeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
      }
    } else if (!hasSavedToLocalRef.current) {
      // Buat timer baru
      startTime = Date.now()
      endTime = startTime + validInitialTime * 1000
      initialTimeLeft = validInitialTime

      localStorage.setItem("examTimerStart", startTime.toString())
      localStorage.setItem("examTimerEnd", endTime.toString())
      hasSavedToLocalRef.current = true
    } else {
      // Fallback
      startTime = Date.now()
      endTime = startTime + validInitialTime * 1000
      initialTimeLeft = validInitialTime
    }

    setTimeLeft(initialTimeLeft)

    // Mulai interval update tiap detik
    timerRef.current = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000))

      setTimeLeft(remaining)
      onTimeUpdate(remaining)

      if (remaining <= 0) {
        clearInterval(timerRef.current!)
        onTimeExpired()
      }
    }, 1000)

    // Cleanup saat unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
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

// Fungsi untuk restore timer state dari localStorage
export function restoreTimerState(): number {
  try {
    const storedStartTime = localStorage.getItem("examTimerStart")
    const storedEndTime = localStorage.getItem("examTimerEnd")

    if (storedStartTime && storedEndTime) {
      const startTime = Number.parseInt(storedStartTime)
      const endTime = Number.parseInt(storedEndTime)
      const now = Date.now()
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
      return remaining
    }
  } catch (error) {
    console.error("Error restoring timer state:", error)
  }

  return 3600 // fallback
}
