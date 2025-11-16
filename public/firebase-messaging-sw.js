// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB_32kh2o6DdBVVvLFFBUdMnTbPWWYp4z8",
  authDomain: "rentongovehicle-7e6c0.firebaseapp.com",
  projectId: "rentongovehicle-7e6c0",
  storageBucket: "rentongovehicle-7e6c0.firebasestorage.app",
  messagingSenderId: "406882720905",
  appId: "1:406882720905:web:e7a2a367658a2cf1b03a58",
  measurementId: "G-BC3ZM7VJ9C"

});

const messaging = firebase.messaging();

// Handle background messages for push notifications
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'Notification';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/logo.png', // Change to your app icon if needed
    data: payload.data || {},
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});