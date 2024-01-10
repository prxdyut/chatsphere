const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");
const { getMessaging } = require("firebase-admin/messaging");
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const registrationTokens = [
  `cHpAS3Jv49E-MK9sUGNNyX:APA91bFqFuwJ0ejJeovDBQ3DGAQS2bMT5aksTG928lH_XwpTRbNOZn6IeLe1RWyKG19Du9gdijleqkzVLRsJJzY8QSbFSadHxqfE5LWimPimg9mVA4i3wad6yeTfg1wMXs2KUC1hVrvU`,
];

const topic = "Room1";

const message = {
  webpush: {
    notification: {
      title: "New Content!",
      body: "2 new videos has been uploaded.",
      icon: "your_icon",
      tag: 'ss',
      renotify: true,
    },
  },
  topic,
};

getMessaging()
  .send(message)
  .then((response) => {
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });

getMessaging()
  .subscribeToTopic(registrationTokens, "Room1")
  .then((response) => {
    console.log("Successfully subscribed to topic:", response);
  })
  .catch((error) => {
    console.log("Error subscribing to topic:", error);
  });

module.exports = { firebaseApp };
