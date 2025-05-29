self.addEventListener("push", (e)=>{

  const config = {
    body: "This is a push notification",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  if (self.registration) {
    e.waitUntil(self.registration.showNotification("Push Notification", config));
  } else {
    console.error("Service worker registration not found.");
  }
})