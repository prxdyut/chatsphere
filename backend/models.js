const connectToMongoDB = require('./mongodb')
const mongoose = require("mongoose");

connectToMongoDB()
const chatroomsSchema = new mongoose.Schema({
  roomId: String,
  users: [String],
  name: String,
  description: String,
  created: Date,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const messagesSchema = new mongoose.Schema({
  user: String,
  type: String,
  content: String,
  created: Date,
});

const chatroom = mongoose.model("Chatrooms", chatroomsSchema);
const message = mongoose.model("Messsages", messagesSchema);

module.exports = { chatroom, message };