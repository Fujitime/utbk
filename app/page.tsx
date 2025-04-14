"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LandingPage() {
  const currentYear = 2025

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              className="flex flex-col items-center text-center space-y-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Simulasi UTBK {currentYear}
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg blur opacity-30 -z-10"></div>
              </div>

              <p className="text-xl text-gray-300 max-w-[600px] mx-auto">
                Latihan UTBK gratis dengan soal berkualitas dan analisis hasil real-time
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <Link href="/instructions?mode=builtin" passHref>
                  <Button
                    size="lg"
                    className="w-full h-16 text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-0 shadow-lg shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-900/50 hover:scale-[1.02]"
                  >
                    Coba Tryout Lengkap
                  </Button>
                </Link>

                <Link href="/mini-practice?mode=builtin" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-16 text-lg border-2 border-blue-500 text-blue-400 hover:bg-blue-950/30 shadow-lg shadow-blue-900/20 transition-all duration-300 hover:shadow-blue-900/40 hover:scale-[1.02]"
                  >
                    Coba Latihan Mini
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Mode Section (Beta) */}
        <section className="w-full py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <motion.div
              className="flex flex-col items-center text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium shadow-lg shadow-purple-900/30 animate-pulse">
                BETA
              </div>

              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
                Coba dengan AI
              </h2>

              <p className="text-gray-300 max-w-[600px]">
                Soal dinamis yang dihasilkan oleh AI dengan tingkat kesulitan yang dapat disesuaikan
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                <Link href="/instructions?mode=ai" passHref>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 shadow-lg shadow-purple-900/30 transition-all duration-300 hover:shadow-purple-900/50 hover:scale-[1.02]"
                  >
                    Tryout dengan AI
                  </Button>
                </Link>

                <Link href="/mini-practice?mode=ai" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-purple-500 text-purple-400 hover:bg-purple-950/30 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:shadow-purple-900/40 hover:scale-[1.02]"
                  >
                    Latihan Mini AI
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-6 relative z-10">
        <div className="container px-4 md:px-6 mx-auto">
          <p className="text-center text-sm text-gray-500">© {currentYear} UTBK Simulasi. Dibuat oleh Waltahh</p>
        </div>
      </footer>
    </div>
  )
}
