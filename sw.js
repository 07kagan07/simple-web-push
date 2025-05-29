self.addEventListener("push", e => {
  const config = {
    body: "Mesaj içeriği burada yer alacak.",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  if (self.registration) {
    e.waitUntil(self.registration.showNotification("Mesaj başlığı burada", config));
  } else {
    console.error("Service worker registration not found.");
  }
});
