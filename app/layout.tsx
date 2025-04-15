import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Simulasi UTBK 2025 | Tryout UTBK GRATIS Berbasis AI",
  description:
    "Simulasi UTBK 2025 GRATIS dengan soal dinamis berbasis AI. Latihan UTBK SNBT terlengkap dengan 7 subtes, analisis hasil real-time, dan rekomendasi belajar personal. Tingkatkan skor UTBK Anda sekarang!",
  keywords: [
    "UTBK 2025",
    "Simulasi UTBK gratis",
    "Tryout UTBK online",
    "Latihan UTBK berbasis AI",
    "SNBT 2025",
    "Persiapan UTBK",
    "Soal UTBK",
    "Tryout gratis",
    "Simulasi ujian",
    "Tes masuk PTN",
    "SBMPTN",
    "Latihan soal UTBK",
    "Prediksi soal UTBK 2025",
  ],
  authors: [{ name: "UTBK Simulator Team" }],
  creator: "UTBK Simulator",
  publisher: "UTBK Simulator",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://utbk.vercel.app/",
    title: "Simulasi UTBK 2025 | Tryout UTBK GRATIS Berbasis AI",
    description:
      "Simulasi UTBK 2025 GRATIS dengan soal dinamis berbasis AI. Latihan UTBK SNBT terlengkap dengan 7 subtes, analisis hasil real-time, dan rekomendasi belajar personal.",
    siteName: "UTBK Simulator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UTBK Simulator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulasi UTBK 2025 | Tryout UTBK GRATIS Berbasis AI",
    description:
      "Simulasi UTBK 2025 GRATIS dengan soal dinamis berbasis AI. Latihan UTBK SNBT terlengkap dengan 7 subtes, analisis hasil real-time, dan rekomendasi belajar personal.",
    images: ["/og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563eb",
  generator: "Next.js",
  applicationName: "UTBK Simulator",
  category: "education",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="canonical" href="https://utbk-simulator.vercel.app/" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="google-site-verification" content="8P23QSTZuBhdGUN41YJky9h4_XBDTWuyxeQQlcZ3crQ" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Simulasi UTBK 2025 | Tryout UTBK GRATIS Berbasis AI",
              description:
                "Simulasi UTBK 2025 GRATIS dengan soal dinamis berbasis AI. Latihan UTBK SNBT terlengkap dengan 7 subtes, analisis hasil real-time, dan rekomendasi belajar personal.",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "IDR",
              },
              author: {
                "@type": "Organization",
                name: "UTBK Simulator Team",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"


import './globals.css'