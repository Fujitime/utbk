"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, Brain, Sparkles, Bot, ArrowRight } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function LandingPage() {
  const currentYear = new Date().getFullYear()
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-slate-900 text-white">
      {/* Header/Navigation - Simplified */}
      <header className="border-b border-blue-900/50 backdrop-blur-sm bg-blue-950/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span className="font-bold text-xl">UTBK Simulator</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-8">
        {/* Hero Section - Simplified */}
        <section className="py-8 md:py-12">
          <motion.div
            className="text-center space-y-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Persiapan UTBK {currentYear}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Simulasi UTBK{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {currentYear}
              </span>
            </h1>
            <p className="text-base text-slate-300">Latihan UTBK gratis dengan soal berkualitas. Mulai sekarang!</p>

            <div className="flex flex-col gap-3 pt-4 max-w-xs mx-auto">
              <Link href="/register?mode=builtin" passHref>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0"
                >
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/register?mode=builtin&practice=true" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-blue-500 text-blue-400 hover:bg-blue-900/30"
                >
                  Latihan Mini
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section - Simplified */}
        <section className="py-8">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="bg-blue-900/20 p-4 rounded-xl border border-blue-800/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <BookOpen className="h-6 w-6 text-blue-400 mb-2" />
              <h3 className="font-medium text-sm mb-1">7 Subtes Lengkap</h3>
              <p className="text-xs text-slate-300">Semua subtes UTBK tersedia</p>
            </motion.div>

            <motion.div
              className="bg-blue-900/20 p-4 rounded-xl border border-blue-800/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Brain className="h-6 w-6 text-purple-400 mb-2" />
              <h3 className="font-medium text-sm mb-1">160+ Soal</h3>
              <p className="text-xs text-slate-300">Soal berkualitas tinggi</p>
            </motion.div>

            <motion.div
              className="bg-blue-900/20 p-4 rounded-xl border border-blue-800/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Bot className="h-6 w-6 text-cyan-400 mb-2" />
              <h3 className="font-medium text-sm mb-1">100% Gratis</h3>
              <p className="text-xs text-slate-300">Tanpa biaya tersembunyi</p>
            </motion.div>

            <motion.div
              className="bg-blue-900/20 p-4 rounded-xl border border-blue-800/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Bot className="h-6 w-6 text-cyan-400 mb-2" />
              <h3 className="font-medium text-sm mb-1">Akses 24/7</h3>
              <p className="text-xs text-slate-300">Belajar kapan saja</p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer - Simplified */}
      <footer className="border-t border-blue-900/30 py-6 bg-blue-950/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="font-bold">UTBK Simulator</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Platform simulasi UTBK terbaik untuk persiapan ujian masuk perguruan tinggi.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/Fujitime/utbk"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <p className="text-xs text-slate-500 mt-4">© {currentYear} UTBK Simulator. Dibuat oleh Waltahh</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
