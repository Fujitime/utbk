"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, Brain, Sparkles, Bot, ChevronRight, BarChart, Clock, Award, Shuffle } from "lucide-react"

export default function LandingPage() {
  const currentYear = 2025

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Header/Navigation */}
      <header className="border-b border-slate-800 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span className="font-bold text-xl">UTBK Simulator</span>
          </div>

          <div>
            <Link href="/instructions?mode=builtin" passHref>
              <Button variant="outline" size="sm"   className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white hover:shadow-lg transition duration-200">
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Persiapan UTBK {currentYear} Terbaik</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Simulasi UTBK{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
  {new Date().getFullYear()}
</span>
                </h1>
                <p className="text-lg text-slate-300 max-w-xl">
                Latihan UTBK gratis. Rill, no fek-fek.
                No teori-teori—real experience!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/instructions?mode=builtin" passHref>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0"
                    >
                      Tryout Lengkap
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/mini-practice?mode=builtin" passHref>
                    <Button size="lg" variant="outline" className="border-blue-500 text-blue-900 ">
                      Latihan Mini
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs">🧠</div>
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs">
                      📚
                    </div>
                    <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-xs">🤖</div>
                  </div>
                  <p className="text-sm text-slate-400">Bergabung dengan 5,000+ pelajar</p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50 shadow-xl">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-slate-400">Simulasi UTBK</div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <BookOpen className="h-5 w-5 text-blue-400" />
                          <h3 className="font-medium">Penalaran Umum</h3>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Brain className="h-5 w-5 text-purple-400" />
                          <h3 className="font-medium">Penalaran Matematika</h3>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Bot className="h-5 w-5 text-cyan-400" />
                          <h3 className="font-medium">Literasi Bahasa Inggris</h3>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-screen filter blur-[32px] opacity-30"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">7</div>
                <p className="text-sm text-slate-400 mt-1">Subtes Lengkap</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">160+</div>
                <p className="text-sm text-slate-400 mt-1">Soal Berkualitas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">100%</div>
                <p className="text-sm text-slate-400 mt-1">Gratis</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">24/7</div>
                <p className="text-sm text-slate-400 mt-1">Akses Kapan Saja</p>
              </div>
            </div>
          </div>
        </section>

  

        {/* AI Mode Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6 order-1 lg:order-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-900/30 border border-red-700/30 text-red-400 text-sm">
                  <Bot className="h-4 w-4 mr-2" />
                  <span>Mode AI (BETA - Belum Disarankan)</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Mode AI Dalam Pengembangan</h2>
                <p className="text-lg text-slate-300">
                  Mode AI kami masih dalam tahap pengembangan dan belum disarankan untuk digunakan. Kami menyarankan
                  untuk menggunakan mode soal bawaan untuk pengalaman terbaik.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/instructions?mode=ai" passHref>
                    <Button variant="outline" className="border-red-500 text-red-400">
                      Coba Mode AI (BETA)
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <p className="text-sm text-red-300">
                    <strong>Catatan:</strong> Mode AI masih dalam tahap pengembangan dan mungkin tidak stabil. Gunakan
                    mode soal bawaan untuk pengalaman terbaik.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

  

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm mb-4">
                <Award className="h-4 w-4 mr-2" />
                <span>Testimoni</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka</h2>
              <p className="text-slate-300">Dengarkan pengalaman mereka yang telah menggunakan Simulator UTBK kami.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg mr-3">
                    🧠
                  </div>
                  <div>
                    <h4 className="font-semibold">Ilman</h4>
                    <p className="text-sm text-slate-400">Diterima di UI</p>
                  </div>
                </div>
                <p className="text-slate-300">
                  "Simulator UTBK ini sangat membantu saya dalam persiapan UTBK. Soal-soalnya mirip dengan soal UTBK
                  asli dan analisisnya sangat detail."
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-lg mr-3">
                    📚
                  </div>
                  <div>
                    <h4 className="font-semibold">Maulana</h4>
                    <p className="text-sm text-slate-400">Diterima di ITB</p>
                  </div>
                </div>
                <p className="text-slate-300">
                  "Fitur acak soal sangat membantu saya untuk tidak menghafal urutan jawaban. Soal-soalnya tetap sama
                  tapi urutannya berbeda setiap kali latihan."
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-lg mr-3">
                    🤖
                  </div>
                  <div>
                    <h4 className="font-semibold">Rifqi</h4>
                    <p className="text-sm text-slate-400">Diterima di UGM</p>
                  </div>
                </div>
                <p className="text-slate-300">
                  "Latihan Mini sangat membantu saya fokus pada subtes yang lemah. Hasilnya, skor UTBK saya meningkat
                  signifikan!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700/50 shadow-xl max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Untuk Meningkatkan Skor UTBK Anda?</h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  Mulai persiapan UTBK Anda sekarang dengan Simulator UTBK kami. Gratis, mudah digunakan, dan dirancang
                  untuk membantu Anda mencapai skor terbaik.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/instructions?mode=builtin" passHref>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0"
                  >
                    Mulai Tryout Lengkap
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/mini-practice?mode=builtin" passHref>
                  <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-950/30">
                    Coba Latihan Mini
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-12 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <span className="font-bold text-xl">UTBK Simulator</span>
              </div>
              <p className="text-slate-400 text-sm">
                Platform simulasi UTBK terbaik untuk persiapan ujian masuk perguruan tinggi.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Fitur</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tryout Lengkap
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Latihan Mini
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Mode AI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Analisis Hasil
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex space-x-4">
                <Link href="https://github.com/Fujitime/utbk" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="https://github.com/Fujitime/" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="https://github.com/Fujitime/utbk" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">© {currentYear} UTBK Simulator. Dibuat oleh Waltahh</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
