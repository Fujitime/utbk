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
import { AlertTriangle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface ReportQuestionProps {
  subtest: string
  questionNumber: number
  questionText: string
}

export function ReportQuestion({ subtest, questionNumber, questionText }: ReportQuestionProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")

  const handleReport = () => {
    try {
      // Get existing reports or initialize empty object
      const existingReports = JSON.parse(localStorage.getItem("reportedQuestions") || "{}")

      // Add new report
      existingReports[`${subtest}-${questionNumber}`] = {
        subtest,
        questionNumber,
        questionText,
        reason,
        details,
        timestamp: new Date().toISOString(),
      }

      // Save back to localStorage
      localStorage.setItem("reportedQuestions", JSON.stringify(existingReports))

      toast({
        title: "Laporan terkirim",
        description: "Terima kasih atas laporan Anda. Soal ini akan ditinjau.",
      })

      // Close dialog
      setOpen(false)
    } catch (error) {
      console.error("Error reporting question:", error)
      toast({
        title: "Gagal mengirim laporan",
        description: "Terjadi kesalahan saat mengirim laporan",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <AlertTriangle className="h-4 w-4 mr-1" />
        Laporkan Soal
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Laporkan Soal</DialogTitle>
            <DialogDescription>Laporkan soal yang bermasalah atau tidak sesuai dengan standar UTBK.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Soal yang dilaporkan:</h4>
              <p className="text-sm text-gray-500 border-l-2 border-gray-200 pl-2">{questionText}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Alasan pelaporan:</h4>
              <RadioGroup value={reason} onValueChange={setReason}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incorrect" id="incorrect" />
                  <Label htmlFor="incorrect">Jawaban tidak benar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unclear" id="unclear" />
                  <Label htmlFor="unclear">Soal tidak jelas atau ambigu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="irrelevant" id="irrelevant" />
                  <Label htmlFor="irrelevant">Tidak relevan dengan subtes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offensive" id="offensive" />
                  <Label htmlFor="offensive">Konten tidak pantas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Lainnya</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Detail tambahan:</h4>
              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Jelaskan masalah dengan soal ini..."
                className="h-20"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleReport} disabled={!reason}>
              Kirim Laporan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
