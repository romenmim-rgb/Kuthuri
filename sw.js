/* Service worker: makes the app installable and (optionally) shows background push notifications. */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAVDkA1pCiZVy3ef_RZ6srsDqyNRXeGE30",
  authDomain: "amader-kuthuri.firebaseapp.com",
  projectId: "amader-kuthuri",
  storageBucket: "amader-kuthuri.firebasestorage.app",
  messagingSenderId: "654868196488",
  appId: "1:654868196488:web:2f35754a863885cf17433d"
});

const messaging = firebase.messaging();
// Push messages are sent as data-only by the Cloud Function (see functions/index.js)
messaging.onBackgroundMessage(payload => {
  const d = payload.data || {};
  self.registration.showNotification(d.title || 'আমাদের কুঠুরি', {
    body: d.body || '',
    icon: 'icon-192.png',
    tag: d.tag || 'kuthuri',
    data: d
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for(const c of list){ if('focus' in c) return c.focus(); }
    return clients.openWindow('./');
  }));
});
self.addEventListener('fetch', () => {});
