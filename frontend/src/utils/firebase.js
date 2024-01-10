import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from "firebase/messaging";

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console. 
const firebaseConfig = {
  apiKey: "AIzaSyCtdh_1fSeM3_UUoe03hnrzCchH29T8Ab0",
  authDomain: "chatsphere-fdf42.firebaseapp.com",
  projectId: "chatsphere-fdf42",
  storageBucket: "chatsphere-fdf42.appspot.com",
  messagingSenderId: "1046640113255",
  appId: "1:1046640113255:web:7e056168a6ad590dabc6c2",
  measurementId: "G-84K8Q4XM4Y",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: 'BCizhiAEndjek1YHWFbEaX23EuT6e6TC-rEJNOSvNsAXwwPfFsv-zVYulap4QYSPn12iVSPfo6bGGTCf-_48vmE' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  const registrationTokens = [
    `cHpAS3Jv49E-MK9sUGNNyX:APA91bFqFuwJ0ejJeovDBQ3DGAQS2bMT5aksTG928lH_XwpTRbNOZn6IeLe1RWyKG19Du9gdijleqkzVLRsJJzY8QSbFSadHxqfE5LWimPimg9mVA4i3wad6yeTfg1wMXs2KUC1hVrvU`,
  ];
