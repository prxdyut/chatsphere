const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");
const { getMessaging } = require("firebase-admin/messaging");
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const registrationTokens = [
  `cHpAS3Jv49E-MK9sUGNNyX:APA91bFqFuwJ0ejJeovDBQ3DGAQS2bMT5aksTG928lH_XwpTRbNOZn6IeLe1RWyKG19Du9gdijleqkzVLRsJJzY8QSbFSadHxqfE5LWimPimg9mVA4i3wad6yeTfg1wMXs2KUC1hVrvU`,
  "cbl5A-_fFBi6OzCVbeY9PP:APA91bHn3wjjFZ1k54aCu2D7PVpSFoabrjHMhLSlam9TjBK5tQNrquoRe6gJhqP343G6vahO75DGyBbuJjb46VBGhjmLmYtlW9EG7vIrUZAwtzIYvW4hsCoUEQlYMKy-QH8VscmVII3Q"];

const topic = "Room1";

const message = {
  webpush: {
    notification: {
      title: "New Content!",
      body: "2 new videos has been uploaded.",
      icon: "your_icon",
      tag: 'ss',
      renotify: true,
      sound: true,
      data:'aaa'
    },
   
  },
  condition: `('Room1' in topics)`
};

// getMessaging()
//   .send(message)
//   .then((response) => {
//     console.log("Successfully sent message:", response);
//   })
//   .catch((error) => {
//     console.log("Error sending message:", error);
//   });

//   getMessaging()
//   .subscribeToTopic(registrationTokens, "Room1")
//   .then((response) => {
//     console.log("Successfully subscribed to topic:", response);
//   })
//   .catch((error) => {
//     console.log("Error subscribing to topic:", error);
//   });

module.exports = { firebaseApp };
