import { useContext, useState } from "react";
 
import ChatArea from "./ChatArea";
import ChatBar from "./ChatBar";
import ChatHeaderMultiple from "./ChatHeaderMultiple";
import ChatHeaderSingle from "./ChatHeaderSingle";
import { BsShare, BsXLg } from "react-icons/bs";
import ChatInformation from "./ChatInformation";
import { ChatContext } from "../contexts/chat";

export default function ChatContainer() {

  const [open, setOpen] = useState();
  const toggleOpen = () => setOpen(!open);

  return (
    <div className="col-span-5 h-screen overflow-y-auto flex flex-col flex-grow  bg-[url(https://img.freepik.com/premium-vector/white-abstract-pattern-background-with-futuristic-modern-style-concept_7505-2300.jpg)]">
      <ChatHeaderSingle onClick={toggleOpen} />
      <ChatArea />
      <ChatBar />
      <ChatInformation open={open} toggle={toggleOpen} />
    </div>
  );
}
