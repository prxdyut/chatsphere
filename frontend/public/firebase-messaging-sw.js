importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCtdh_1fSeM3_UUoe03hnrzCchH29T8Ab0",
    authDomain: "chatsphere-fdf42.firebaseapp.com",
    projectId: "chatsphere-fdf42",
    storageBucket: "chatsphere-fdf42.appspot.com",
    messagingSenderId: "1046640113255",
    appId: "1:1046640113255:web:7e056168a6ad590dabc6c2",
    measurementId: "G-84K8Q4XM4Y",
  };


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.data.title + ' Pradyut';
//   const notificationOptions = {
//     body: payload.data.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

// class CustomPushEvent extends Event {
//   constructor(data) {
//     super('push');

//     Object.assign(this, data);
//     this.custom = true;
//   }
// }

// self.addEventListener('push', (e) => {
//   if (e.custom) return;

//   const oldData = e.data;
// console.log(oldData)
//   const newEvent = new CustomPushEvent({
//     data: {
//       ehheh: oldData.json(),
//       json() {
//         const newData = oldData.json();
//         newData.data = {
//           ...newData.data,
//           ...newData.notification,
//         };
//         delete newData.notification;
//         return newData;
//       },
//     },
//     waitUntil: e.waitUntil.bind(e),
//   });

//   e.stopImmediatePropagation();

//   dispatchEvent(newEvent);
// });