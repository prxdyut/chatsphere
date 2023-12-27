import React, { useEffect, useState } from "react";
export const ChatContext = React.createContext();
import io from "socket.io-client";

export default function ChatProvider({ children }) {
  const [room, setRoom] = useState(null);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.emit("join-room", { room });
    socket.on("new-message", (val) => console.log("recieved", val));
    socket.on("disconnect", () => console.log("server disconnected"));
  }, [room]);

  const sendMessage = (data) => {
    socket.emit("send-message", data);
  };

  return (
    <ChatContext.Provider value={{ room, setRoom, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
