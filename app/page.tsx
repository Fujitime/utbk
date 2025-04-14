import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simulasi Cerdas UTBK 2025
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Tryout UTBK dinamis dengan soal berbasis data asli & AI
                </p>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg max-w-3xl mx-auto">
                  <h2 className="text-xl font-semibold mb-3">Fitur Utama:</h2>
                  <ul className="space-y-2 text-left list-disc list-inside">
                    <li>Simulasi lengkap 7 subtes (160 soal, 195 menit)</li>
                    <li>Soal selalu di-generate secara dinamis</li>
                    <li>Tampilan menyerupai ujian resmi</li>
                    <li>Penilaian real-time dengan AI</li>
                    <li>Progress tersimpan otomatis</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/instructions" passHref>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                      Mulai Tryout Lengkap
                    </Button>
                  </Link>
                  <Link href="/mini-practice" passHref>
                    <Button size="lg" variant="outline" className="px-8">
                      Latihan Mini
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 Simulasi Cerdas UTBK. Semua hak cipta dilindungi.
          </p>
        </div>
      </footer>
    </div>
  )
}
