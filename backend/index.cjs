require("dotenv").config();
const pkg = require("@clerk/clerk-sdk-node");
const clerkClient = pkg;
const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const app = express();
const server = http.createServer(app);
const io = require("./socketio")(server);
const { chatroom, message } = require("./models");
const PORT = process.env.PORT;
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("./firebase.cjs");
const { getMessaging } = require("firebase-admin/messaging");

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.json({ status: "working", ok: true }).status(204);
  } catch (error) {
    console.error("Error handling route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/rooms", async (req, res) => {
  const userId = req.query.userId;
  if (userId) {
    try {
      const RESULT = await chatroom.find({ users: userId });
      res.json({ data: RESULT }).status(204);
    } catch (error) {
      console.error("Error handling route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else res.json({ data: [] }).status(204);
});

app.post("/room", async (req, res) => {
  const body = req.body;
  try {
    if (body?.users.length > 0) {
      const RESULT = new chatroom(req.body);
      RESULT.save();
      res.json(RESULT).status(204);
    } else res.status(500).json({ error: "Please Add Users" });
  } catch (error) {
    console.error("Error handling route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/set-notification-token", async (req, res) => {
  const { userId, token } = await req.body;
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { externalId: token },
    });
    await getMessaging().subscribeToTopic([token], userId);
  } catch (error) {
    console.error("Error handling route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/room", async (req, res) => {
  const body = await req.body;
  try {
    if (body?.users.length > 0) {
      const RESULT = await chatroom.updateOne(
        { _id: body.room },
        { $addToSet: { users: body.users } }
      );
      res.json(RESULT).status(204);
      // res.status(500).json({ error: "Please Select Users" });
    } else res.status(500).json({ error: "Please Select Users" });
  } catch (error) {
    console.error("Error handling route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/room", async (req, res) => {
  const body = await req.body;
  try {
    if (body?.users.length > 0) {
      const RESULT = await chatroom.updateOne(
        { _id: body.room },
        { $pullAll: { users: body.users } }
      );
      res.json(RESULT).status(204);
      // res.status(500).json({ error: "Please Select Users" });
    } else res.status(500).json({ error: "Please Select Users" });
  } catch (error) {
    console.error("Error handling route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList();
    res.json({ data: users }).status(204);
  } catch (error) {
    console.error("Error handling route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA4M442TBE4OXO24XU",
    secretAccessKey: "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",
  },
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "chatsphere",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
});

app.post("/uploadfile", upload.single("file"), (req, res) => {
  if (req.file == null)
    res.status(400).json({ message: "Please choose the file" });

  var file = req.file;
  const data = {
    url: file.location,
    name: file.key,
    type: file.mimetype,
    size: file.size,
  };

  res.status(200).json(data);
});

let status = {};

io.on("connection", async (socket) => {
  let currentUserId;
  socket.on("active", async ({ userId }) => {
    if (userId) {
      currentUserId = userId;
      status[userId] = "online";
      io.emit("status", status);
    }
  });

  socket.on("join", async ({ room }) => {
    socket.join(room);
    const roomData = await chatroom.findById(room);
    socket.emit("joined", roomData);
    const messages = await message.find({ room });
    socket.emit("recieve", messages);
  });

  socket.on("send", async (data) => {
    socket.to(data.room).emit("recieve", [data]);
    const res = new message(data);
    res.save();

    const roomData = await chatroom.findById(data.room);
    const multiple = roomData.users.length > 2;
    const SEND_NOTIFICATION_TO = roomData.users.filter(
      (id) => id != data.userId
    );
    const sender = await clerkClient.users.getUser(data.userId);
    const condition = SEND_NOTIFICATION_TO.map(
      (txt) => `('${txt}' in topics)`
    ).join(" || ");

    const notification = {
      webpush: {
        notification: {
          name: "Pradyut",
          title: multiple
            ? `${roomData.name} - ${sender.firstName} ${sender.lastName}`
            : `${sender.firstName} ${sender.lastName}`,
          body: `${data.content} `,
          badge: "https://chatsphere-theta.vercel.app/logo/main.svg",
          icon: `${sender.imageUrl}`,
          image: data.type == "image" && `${data.fileUrl}`,
          tag: `${roomData._id}`,
          renotify: true,
          sound: "default",
        },
        fcm_options: {
          link: `http://localhost:5173/room?roomId=${roomData._id}`,
        },
      },
      condition,
    };

    getMessaging()
      .send(notification)
      .catch((err) => console.log(err));
  });

  socket.on("disconnect", (reason) => {
    if (currentUserId) {
      status[currentUserId] = new Date();
      io.emit("status", status);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

server.listen(PORT, (err) => {
  if (err) console.error("Error starting server:", err);
  else console.log("Server running on Port", PORT);
});
