importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

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
