import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocalStorage } from "@uidotdev/usehooks";
import getFileType from "../helper/getFileType";
import { useAuth, useUser } from "@clerk/clerk-react";
export const ChatContext = React.createContext();

export default function ChatProvider({ children }) {
  const [id, setId] = useState(Math.random());
  const [room, setRoom] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [newMessage, setNewMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recents, saveRecent] = useLocalStorage("drawing", {});
  const { user } = useUser();

  const socket = io("http://localhost:5000", { query: "foo=bar" });

  const uniqueMessages = [...new Set(messages.map(({ id }) => id))].map((id) =>
    messages.find((message) => message.id == id)
  );
  const roomMessages = uniqueMessages.filter((message) => room == message.room);

  useEffect(() => {
    if (newMessage) setMessages([...messages, ...newMessage]);
  }, [newMessage]);

  useEffect(() => {
    setMessages([]);
    if (room !== null) {
      socket.emit("join", { room });
      socket.on("joined", (data) => setRoomData(data));
    }
    socket.emit("active", { userId: user?.id });
    socket.on("recieve", (data) => {
      setNewMessage(data);

      let content = "Sent a new message!";
      if (data[data.length - 1].type == "text")
        content = "Sent " + data[data.length - 1].content;
      if (data[data.length - 1].type == "image") content = "Sent Image";
      if (data[data.length - 1].type == "file")
        content =
          "Sent " + getFileType(data[data.length - 1].fileUrl) + " File";
      saveRecent({
        ...recents,
        [room]: {
          by: data[data.length - 1].userId,
          message: content,
        },
      });
    });
    // socket.on("status", (data) => console.dir(data));
    socket.on("disconnect", () => console.log("server disconnected"));
  }, [room, id, user]);

  const sendMessage = (data) => {
    const messageData = {
      ...data,
      room,
      created: new Date(),
      id: `${new Date().getTime()}`,
    };
    socket.emit("send", messageData);
    setNewMessage([messageData]);
  };
  const multipleUsers = !(roomData?.users?.length == 2);
  const loadRoom = () => setId(Math.random());
  return (
    <ChatContext.Provider
      value={{
        room,
        setRoom,
        sendMessage,
        messages: roomMessages,
        roomData,
        multipleUsers,
        loadRoom,
        recents,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
