require("dotenv").config();
const pkg = require("@clerk/clerk-sdk-node");
const clerkClient = pkg;
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = require("./socketio")(server);
const { chatroom, message } = require("./models");
const PORT = process.env.PORT;
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const RESULT = new chatroom({ pradyut: "yo", date: new Date() });
    RESULT.save();
    res.json(RESULT).status(204);
  } catch (error) {
    console.error("Error handling route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

let ALL_CHATROOMS = [];

app.get("/rooms", async (req, res) => {
  try {
    const RESULT = await chatroom.find();
    res.json({ data: RESULT }).status(204);
  } catch (error) {
    console.error("Error handling route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

io.on("connection", async (socket) => {
  
  socket.on("join", async ({ room }) => {
    socket.join(room);
    const roomData = await chatroom.findById(room)
    socket.emit("joined", roomData);
    const messages = await message.find({room})
    socket.emit("recieve", messages);
  });

  socket.on("send", async (data) => {
    socket.to(data.room).emit("recieve", [data]);
    const res = new message(data)
    res.save()
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
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
