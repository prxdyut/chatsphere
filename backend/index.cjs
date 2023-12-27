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
const { createPresignedPost } = require("./utils/s3");
const PORT = process.env.PORT;

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

app.post("/signed_url", async (req, res) => {
  try {
    let { key, content_type } = req.body;
    key = "public/" + key;
    const data = await createPresignedPost({ key, contentType: content_type });
    return res.send({
      status: "success",
      data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
});

io.on("connection", (socket) => {
  let currentRoom;

  socket.on("join-room", ({ room }) => {
    if (currentRoom) {
      socket.leave(currentRoom);
    }
    socket.join(room);
    currentRoom = room;
  });

  socket.on("send-message", (data) => {
    socket.broadcast.to(currentRoom).emit("new-message", data);
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
