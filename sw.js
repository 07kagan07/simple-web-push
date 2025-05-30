self.addEventListener("push", e => {
  console.log("event", e);
  console.log("event.data", e.data);
  console.log("event.data.text", e.data.text());

  const { head, body, url } = e.data.json();

  console.log("head", head);
  console.log("body", body);

  const config = {
    body: body || "Detaylar için lütfen tıklayın.",
    url: url || "https://google.com",
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

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Bildirimi kapat

  // URL'yi al
  const urlToOpen = event.notification.data?.url || "https://ornek-site.com";

  // Kullanıcıda açık bir pencere varsa ona odaklan, yoksa yeni pencere aç
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener("notificationclose", e => {
  console.log("notificationclose", e);
  const notification = e.notification;
  console.log("Notification closed:", notification.data.primaryKey);
});
