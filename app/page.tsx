import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Sparkles, BookOpen, Clock, BarChart3 } from "lucide-react"

export default function LandingPage() {
  const currentYear = 2025

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">
                100% GRATIS - Tanpa Biaya Apapun
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simulasi Cerdas UTBK {currentYear}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Tryout UTBK GRATIS dengan soal dinamis berbasis AI dan analisis hasil real-time
                </p>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg max-w-3xl mx-auto">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                    Fitur Utama:
                  </h2>
                  <ul className="space-y-2 text-left grid md:grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Simulasi lengkap 7 subtes (160 soal)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Soal dinamis berbasis AI</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Tampilan menyerupai ujian resmi</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Penilaian real-time dengan AI</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Progress tersimpan otomatis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Analisis hasil komprehensif</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-semibold flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                      Tryout Lengkap
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/instructions?mode=ai" passHref>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                          Dengan Soal AI
                        </Button>
                      </Link>
                      <Link href="/instructions?mode=builtin" passHref>
                        <Button size="lg" variant="outline" className="px-8">
                          Dengan Soal Bawaan
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-4 sm:mt-0">
                    <h3 className="font-semibold flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-600" />
                      Latihan Mini
                    </h3>
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
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Mengapa Menggunakan Simulasi UTBK {currentYear}?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Platform simulasi UTBK GRATIS terlengkap dengan teknologi AI untuk persiapan optimal
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg">
                  <Sparkles className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Soal Berbasis AI</h3>
                  <p className="text-gray-500 text-center">
                    Soal dinamis yang dihasilkan oleh AI dengan tingkat kesulitan menyerupai UTBK asli
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg">
                  <Clock className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Simulasi Realistis</h3>
                  <p className="text-gray-500 text-center">
                    Pengalaman ujian yang menyerupai UTBK asli dengan timer dan navigasi soal
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg">
                  <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analisis Mendalam</h3>
                  <p className="text-gray-500 text-center">
                    Laporan hasil komprehensif dengan analisis kekuatan dan kelemahan per subtes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-gray-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © {currentYear} Simulasi Cerdas UTBK. 100% GRATIS untuk semua pelajar Indonesia.
          </p>
        </div>
      </footer>
    </div>
  )
}
