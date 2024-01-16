import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocalStorage } from "@uidotdev/usehooks";
import getFileType from "../helper/getFileType";
import { useAuth, useUser } from "@clerk/clerk-react";
import { apiUrl } from "../helper/apiUrl";

export const ChatContext = React.createContext();

export default function ChatProvider({ children }) {
  const { getToken, sessionId } = useAuth();
  const { user } = useUser();
  const [room, setRoom] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [recents, saveRecent] = useLocalStorage("recents", {});
  const [status, setstatus] = useState({});

  const socket = io(apiUrl, {
    auth: async (cb) => cb({ token: await getToken(), sessionId }),
  });
  socket.au;
  const multipleUsers = !(roomData?.users?.length == 2);
  const roomMessages = messages.filter((message) => room == message.room);

  const newMessages = (data) =>
    setMessages((prev) => {
      const messages = [...prev, ...data];
      return [...new Set(messages.map(({ id }) => id))].map((id) =>
        messages.find((message) => message.id == id)
      );
    });

  const onMessageRecieve = (data) => {
    console.log("triggered", data);
    newMessages(data);
    let content = "Sent a new message!";
    switch (data[data.length - 1].type) {
      case "text":
        content = "Sent " + data[data.length - 1].content;
        break;
      case "image":
        content = "Sent Image";
        break;
      case "file":
        content = "Sent " + data[data.length - 1].content;
        break;
      case "file":
        content =
          "Sent " + getFileType(data[data.length - 1].fileUrl) + " File";
        break;
    }

    saveRecent((prev) => ({
      ...prev,
      [room]: {
        by: data[data.length - 1].userId,
        message: content,
      },
    }));
  };

  const onStatusChange = (data) => setstatus((prev) => ({ ...prev, ...data }));
  const sendMessage = (data) => {
    const messageData = {
      ...data,
      room,
      created: new Date(),
      id: `${new Date().getTime()}`,
    };
    socket.emit("send", messageData);
  };

  const loadRoom = () => {
    room && socket.emit("join", { room });
    socket.on("joined", setRoomData);
    socket.on("recieve", onMessageRecieve);
    socket.on("status", onStatusChange);
  };

  useEffect(loadRoom, [room, user]);

  return (
    <ChatContext.Provider
      value={{
        room,
        messages: roomMessages,
        roomData,
        multipleUsers,
        recents,
        status,
        setRoom,
        sendMessage,
        loadRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
