"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function ShareTarget() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sharedData, setSharedData] = useState({
    title: "",
    text: "",
    url: "",
  })

  useEffect(() => {
    // Get shared data from URL parameters
    const title = searchParams.get("title") || ""
    const text = searchParams.get("text") || ""
    const url = searchParams.get("url") || ""

    setSharedData({ title, text, url })
  }, [searchParams])

  const handlePractice = () => {
    // Store the shared content if needed
    localStorage.setItem("shared_content", JSON.stringify(sharedData))

    // Redirect to practice page
    router.push("/register?mode=builtin&practice=true")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-slate-900 text-white flex flex-col">
      <header className="border-b border-blue-900/50 backdrop-blur-sm bg-blue-950/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span className="font-bold text-xl">UTBK Simulator</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-800/30 max-w-md w-full">
          <h1 className="text-xl font-bold mb-4 text-center">Konten Dibagikan</h1>

          {sharedData.text && (
            <div className="mb-4">
              <p className="text-sm text-slate-300 mb-2">Teks:</p>
              <div className="bg-slate-800/50 p-3 rounded-lg text-sm">{sharedData.text}</div>
            </div>
          )}

          {sharedData.url && (
            <div className="mb-4">
              <p className="text-sm text-slate-300 mb-2">URL:</p>
              <div className="bg-slate-800/50 p-3 rounded-lg text-sm break-all">{sharedData.url}</div>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-6">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700" onClick={handlePractice}>
              Latihan Mini
            </Button>

            <Button variant="outline" className="w-full border-blue-500 text-blue-400" onClick={() => router.push("/")}>
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
