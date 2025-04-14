"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download, Upload, Copy } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export function SessionExport() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"export" | "import">("export")
  const [exportData, setExportData] = useState("")
  const [importData, setImportData] = useState("")

  // Handle export session data
  const handleExport = () => {
    try {
      // Collect all session data
      const sessionData = {
        tryoutSession: JSON.parse(localStorage.getItem("tryoutSession") || "{}"),
        flaggedQuestions: JSON.parse(localStorage.getItem("flaggedQuestions") || "{}"),
        apiKey: localStorage.getItem("chatgpt-api-key") || "",
        timerData: {
          examTimerStart: localStorage.getItem("examTimerStart") || "",
          examTimerEnd: localStorage.getItem("examTimerEnd") || "",
        },
      }

      // Convert to JSON string
      const jsonData = JSON.stringify(sessionData, null, 2)
      setExportData(jsonData)

      toast({
        title: "Data siap untuk diekspor",
        description: "Salin data ini atau unduh sebagai file JSON",
      })
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Gagal mengekspor data",
        description: "Terjadi kesalahan saat mengekspor data sesi",
        variant: "destructive",
      })
    }
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(exportData)
    toast({
      title: "Disalin ke clipboard",
      description: "Data sesi telah disalin ke clipboard",
    })
  }

  // Handle download as file
  const handleDownload = () => {
    const blob = new Blob([exportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `utbk-session-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle import session data
  const handleImport = () => {
    try {
      const data = JSON.parse(importData)

      // Validate data structure
      if (!data.tryoutSession) {
        throw new Error("Data sesi tidak valid")
      }

      // Import all data to localStorage
      localStorage.setItem("tryoutSession", JSON.stringify(data.tryoutSession))

      if (data.flaggedQuestions) {
        localStorage.setItem("flaggedQuestions", JSON.stringify(data.flaggedQuestions))
      }

      if (data.apiKey) {
        localStorage.setItem("chatgpt-api-key", data.apiKey)
      }

      if (data.timerData) {
        if (data.timerData.examTimerStart) {
          localStorage.setItem("examTimerStart", data.timerData.examTimerStart)
        }
        if (data.timerData.examTimerEnd) {
          localStorage.setItem("examTimerEnd", data.timerData.examTimerEnd)
        }
      }

      toast({
        title: "Data berhasil diimpor",
        description: "Sesi ujian telah dipulihkan",
      })

      // Close dialog
      setOpen(false)

      // Reload page to apply changes
      window.location.reload()
    } catch (error) {
      console.error("Error importing data:", error)
      toast({
        title: "Gagal mengimpor data",
        description: "Format data tidak valid atau rusak",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMode("export")
            setOpen(true)
            handleExport()
          }}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Ekspor Sesi
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMode("import")
            setOpen(true)
          }}
          className="flex items-center gap-1"
        >
          <Upload className="h-4 w-4" />
          Impor Sesi
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{mode === "export" ? "Ekspor Data Sesi" : "Impor Data Sesi"}</DialogTitle>
            <DialogDescription>
              {mode === "export"
                ? "Salin data ini atau unduh sebagai file untuk memindahkan sesi ke perangkat lain."
                : "Tempel data sesi yang telah diekspor sebelumnya untuk memulihkan sesi."}
            </DialogDescription>
          </DialogHeader>

          {mode === "export" ? (
            <>
              <Textarea value={exportData} readOnly className="h-40 font-mono text-xs" />
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={handleCopy} className="flex items-center gap-1">
                  <Copy className="h-4 w-4" />
                  Salin
                </Button>
                <Button onClick={handleDownload} className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Unduh JSON
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <Textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="Tempel data sesi di sini..."
                className="h-40 font-mono text-xs"
              />
              <DialogFooter>
                <Button onClick={handleImport}>Impor Data</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
