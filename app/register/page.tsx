"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [school, setSchool] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user data already exists
    const userData = localStorage.getItem("userData")
    if (userData) {
      const parsedData = JSON.parse(userData)
      setName(parsedData.name || "")
      setSchool(parsedData.school || "")
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    console.log("handleSubmit called") 
    e.preventDefault()

    // Validate inputs
    if (!name.trim()) {
      setError("Nama tidak boleh kosong")
      return
    }

    if (!school.trim()) {
      setError("Asal sekolah/institusi tidak boleh kosong")
      return
    }

    // Save user data to localStorage
    const userData = {
      name: name.trim(),
      school: school.trim(),
      registeredAt: new Date().toISOString(),
    }

    localStorage.setItem("userData", JSON.stringify(userData))

    const urlParams = new URLSearchParams(window.location.search)
    const mode = urlParams.get("mode") || "builtin"
    const isPractice = urlParams.get("practice") === "true"
    const isMiniPractice = window.location.pathname.includes("mini-practice")
    
    // test debug dulu guys
    // console.log("mode:", mode)
    // console.log("practice:", urlParams.get("practice"))
    // console.log("isPractice:", isPractice) 

    
    if (isPractice) {
      router.push(`/mini-practice?mode=${mode}`)
    } else {
      router.push(`/instructions?mode=${mode}`)
    }
    
        
    
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card className="border-0 shadow-lg bg-gradient-to-b from-gray-50 to-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Registrasi Peserta
          </CardTitle>
          <CardDescription>
          Silakan lengkapi data diri Anda sebelum memulai simulasi UTBK. Data tidak disimpan di server.
        </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                placeholder="Masukkan nama lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">Asal Sekolah/Institusi</Label>
              <Input
                id="school"
                placeholder="Masukkan nama sekolah/institusi Anda"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Lanjutkan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
