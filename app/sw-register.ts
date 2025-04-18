export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)

          // Register for push notifications if supported
          if ("PushManager" in window) {
            askNotificationPermission()
          }

          // Register for periodic background sync if supported
          if ("periodicSync" in registration) {
            registerPeriodicSync(registration)
          }
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    })
  }
}

// Ask for notification permission
async function askNotificationPermission() {
  try {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      console.log("Notification permission granted.")
      // You could subscribe the user to push here
    } else {
      console.log("Notification permission denied.")
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error)
  }
}

// Register for periodic background sync
async function registerPeriodicSync(registration: ServiceWorkerRegistration) {
  try {
    // @ts-ignore - TypeScript doesn't know about periodicSync yet
    const periodicSyncManager = registration.periodicSync

    if (periodicSyncManager) {
      // Check if already registered
      const tags = await periodicSyncManager.getTags()

      if (!tags.includes("update-content")) {
        // Register for periodic updates (minimum every 12 hours)
        await periodicSyncManager.register("update-content", {
          minInterval: 12 * 60 * 60 * 1000, // 12 hours in ms
        })
        console.log("Periodic sync registered")
      }
    }
  } catch (error) {
    console.error("Error registering periodic sync:", error)
  }
}
