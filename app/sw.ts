/// <reference lib="webworker" />

// This is the service worker file for the PWA
// It will be compiled and placed in the public directory

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.

declare const self: ServiceWorkerGlobalScope

// Define the cache name
const CACHE_NAME = "utbk-simulator-v1"

// List of URLs to cache initially
// Add list of files to cache here.
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.webmanifest",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
]

// Install event - cache the essential files
// Installation - cache basic files
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page")
      return cache.addAll(FILES_TO_CACHE)
    }),
  )
})

// Activate event - clean up old caches
// Activation - clean up old caches
self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key)
            return caches.delete(key)
          }
          return Promise.resolve()
        }),
      )
    }),
  )
})

// Fetch event - serve from cache or network
// Fetch - serve from cache if available, otherwise fetch from network
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match("offline.html")
        })
      }),
    )
    return
  }

  // Standard cache-first strategy for other requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request).then((response) => {
        // Cache important assets that aren't HTML
        if (
          !response ||
          response.status !== 200 ||
          response.type !== "basic" ||
          event.request.url.includes("/api/") ||
          event.request.method !== "GET"
        ) {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    }),
  )
})

// Background sync for offline form submissions
// Background Sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "exam-submission") {
    event.waitUntil(syncExamData())
  }
})

// Periodic Background Sync for content updates
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-content") {
    event.waitUntil(updateContent())
  }
})

// Push notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title || "UTBK Simulator"
  const options = {
    body: data.body || "Ada pembaruan untuk kamu!",
    icon: "/android-chrome-192x192.png",
    badge: "/badge-icon.png",
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url))
  }
})

// Helper function for background sync
async function syncExamData() {
  const storedRequests = await getStoredRequests()

  for (const request of storedRequests) {
    try {
      await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        mode: "cors",
      })

      // If successful, remove from stored requests
      await removeStoredRequest(request.id)
    } catch (error) {
      console.error("Background sync failed:", error)
      // Will retry on next sync event
      return
    }
  }
}

// Helper function for periodic background sync
async function updateContent() {
  try {
    // Fetch latest question data
    const response = await fetch("/api/questions/latest")
    if (!response.ok) throw new Error("Failed to fetch latest content")

    const data = await response.json()

    // Update cache with new content
    const cache = await caches.open(CACHE_NAME)

    // Cache the new data
    await cache.put("/api/questions/latest", new Response(JSON.stringify(data)))

    // Show notification about new content
    await self.registration.showNotification("Konten Baru Tersedia", {
      body: "Soal-soal baru telah ditambahkan. Buka aplikasi untuk mencobanya!",
      icon: "/android-chrome-192x192.png",
      badge: "/badge-icon.png",
    })
  } catch (error) {
    console.error("Failed to update content:", error)
  }
}

// Helper functions for storing and retrieving background sync requests
async function getStoredRequests() {
  return [] // Implement with IndexedDB in production
}

async function removeStoredRequest(id: string) {
  // Implement with IndexedDB in production
}

// Function to sync stored answers when back online
async function syncAnswers() {
  try {
    const storedAnswers = await getStoredAnswersFromIndexedDB()
    if (storedAnswers && storedAnswers.length > 0) {
      // Process each stored answer
      for (const answer of storedAnswers) {
        await fetch("/api/submit-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        })
      }
      // Clear the synced answers
      await clearSyncedAnswersFromIndexedDB()
    }
  } catch (error) {
    console.error("Error syncing answers:", error)
  }
}

// Placeholder functions for IndexedDB operations
async function getStoredAnswersFromIndexedDB() {
  // Implementation would go here
  return []
}

async function clearSyncedAnswersFromIndexedDB() {
  // Implementation would go here
}

// This ensures TypeScript recognizes this as a module
export {}
