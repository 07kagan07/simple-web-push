self.addEventListener("push", e => {
  console.log("event", e);
  console.log("event.data", e.data);
  console.log("event.data.text", e.data.text());

  const { head, body, url } = e.data.json();

  console.log("head", head);
  console.log("body", body);

  const config = {
    body: body || "Detaylar için lütfen tıklayın.",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: url || "https://google.com"
    },
    icon: "images/logo.png",
    vibrate: [100, 50, 100],
    action: [
      {
        action: "explore",
        title: "Detayları Görüntüle"
      },
      {
        action: "close",
        title: "Kapat"
      }
    ]
  };

  if (self.registration) {
    e.waitUntil(self.registration.showNotification(head || "Mesaj başlığı burada", config));
  } else {
    console.error("Service worker registration not found.");
  }
});
