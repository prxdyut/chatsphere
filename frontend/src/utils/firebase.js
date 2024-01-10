import { initializeApp } from "firebase/app";
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

export const requestForToken = async (userId) => {
  return getToken(messaging, {
    vapidKey:
      "BCizhiAEndjek1YHWFbEaX23EuT6e6TC-rEJNOSvNsAXwwPfFsv-zVYulap4QYSPn12iVSPfo6bGGTCf-_48vmE",
  })
    .then((currentToken) => {
      if (currentToken) {
        if (
          userId &&
          currentToken != localStorage.getItem("notificationToken")
        ) {
          var requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              token: currentToken,
            }),
            redirect: "follow",
          };

          fetch(
            (location.hostname == "localhost"
              ? "http://localhost:5000"
              : "https://api.chatsphere.pradyutdas.online") +
              "/set-notification-token",
            requestOptions
          );
          localStorage.setItem("notificationToken", currentToken);
        }
      } else
        console.log(
          "No registration token available. Request permission to generate one."
        );
    })
    .catch((err) =>
      console.log("An error occurred while retrieving token. ", err)
    );
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
