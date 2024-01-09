import { useContext, useLayoutEffect, useRef, useState } from "react";
import logo from "../assets/logo/main.svg";

import ChatArea from "./ChatArea";
import ChatBar from "./ChatBar";
import ChatHeaderMultiple from "./ChatHeaderMultiple";
import ChatHeaderSingle from "./ChatHeaderSingle";
import { BsShare, BsXLg } from "react-icons/bs";
import ChatInformation from "./ChatInformation";
import { ChatContext } from "../contexts/chat";
import { useAuth } from "@clerk/clerk-react";

export default function ChatContainer() {
  const { room, roomData, messages, status } = useContext(ChatContext);
  const [open, setOpen] = useState();
  const toggleOpen = () => setOpen(!open);
  const { userId } = useAuth();
  const chat_container = useRef(null);

  useLayoutEffect(() => {
    chat_container.current.style.height = window.innerHeight + "px";
  }, []);

  if (!room && !roomData && messages.length == 0)
    return (
      <div
        ref={chat_container}
        className="col-span-5 gap-4 overflow-y-auto justify-center items-center flex flex-col flex-grow   bg-gray-900"
      >
        <img src={logo} className=" h-60 aspect-square max-lg:h-60" />
        <p className=" text-4xl font-bold text-white "> ChatSphere</p>
        <p className="   text-white "> Select any Room to Start a Chat</p>
      </div>
    );

  if (!roomData?.users?.includes(userId))
    return (
      <div
        ref={chat_container}
        className="col-span-5 gap-4 h-screen overflow-y-auto justify-center items-center flex flex-col flex-grow   bg-gray-900"
      >
        <img src={logo} className=" h-60 aspect-square max-lg:h-60" />
        <p className=" text-4xl font-bold text-white "> ChatSphere</p>
        <p className="   text-white font-bold text-xl">
          Un-Authorised Access! to `{roomData?.name}`
        </p>
      </div>
    );
  return (
    <div
      ref={chat_container}
      className="chat_container col-span-5 h-screen overflow-y-auto flex flex-col flex-grow  bg-[url(https://img.freepik.com/premium-vector/white-abstract-pattern-background-with-futuristic-modern-style-concept_7505-2300.jpg)]"
    >
      <ChatHeaderSingle onClick={toggleOpen} />
      <ChatArea />
      <ChatBar />
      <ChatInformation open={open} toggle={toggleOpen} />
    </div>
  );
}
