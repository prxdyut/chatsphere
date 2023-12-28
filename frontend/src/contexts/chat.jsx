import React, { useEffect, useState } from "react";
export const ChatContext = React.createContext();
import io from "socket.io-client";

export default function ChatProvider({ children }) {
  const [id] = useState(Math.random());
  const [room, setRoom] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [newMessage, setNewMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:5000");
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
    socket.on("recieve", (data) => setNewMessage(data));
    socket.on("disconnect", () => console.log("server disconnected"));
  }, [room]);

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

  return (
    <ChatContext.Provider
      value={{
        room,
        setRoom,
        sendMessage,
        messages: roomMessages,
        roomData,
        multipleUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
