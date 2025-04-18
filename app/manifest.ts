import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "UTBK Simulator 2025",
    short_name: "UTBK Sim",
    description: "Simulasi UTBK 2025 GRATIS dengan soal dinamis berbasis AI",
    start_url: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "fullscreen", "minimal-ui"],
    background_color: "#0f172a", // slate-900
    theme_color: "#1e3a8a", // blue-900
    orientation: "portrait",
    dir: "ltr",
    lang: "id",
    scope: "/",
    categories: ["education", "productivity"],
    prefer_related_applications: false,
    related_applications: [],
    handle_links: "preferred",
    launch_handler: {
      client_mode: ["navigate-existing", "auto"],
    },
    edge_side_panel: {
      preferred_width: 400,
    },
    file_handlers: [
      {
        action: "/",
        accept: {
          "application/json": [".json"],
        },
        name: "UTBK Simulator",
      },
    ],
    shortcuts: [
      {
        name: "Tryout Lengkap",
        url: "/register?mode=builtin",
        description: "Mulai tryout lengkap UTBK",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/android-chrome-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/android-chrome-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],        
      },
      {
        name: "Latihan Mini",
        url: "/register?mode=builtin&practice=true",
        description: "Mulai latihan mini UTBK",
        icons: [
          {
            src: "/icons/mini.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      {
        name: "Hasil Terakhir",
        url: "/results",
        description: "Lihat hasil terakhir",
        icons: [
          {
            src: "/icons/results.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    ],
    share_target: {
      action: "/share-target",
      method: "GET",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Halaman Utama UTBK Simulator",
      },
      {
        src: "/screenshots/exam.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Simulasi Ujian UTBK",
      },
    ],
  }
}
