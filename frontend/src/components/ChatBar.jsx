import { useContext, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { GoPaperclip } from "react-icons/go";
import { ChatContext } from "../contexts/chat";
import { useAuth } from "@clerk/clerk-react";
import Home from "../pages";
import ChatSendImage from "./ChatSendImage";
import ChatSendFile from "./ChatSendFile";
export default function ChatBar(params) {
  const { userId } = useAuth();
  const { sendMessage, messages } = useContext(ChatContext);
  const [input, setInput] = useState();
  
  const handleSendText = () =>{
    sendMessage({ type: "text", content: input.trim(), userId }); setInput('')}

  return (
    <div id="chatBar" className=" bottom-0 sticky">
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex lg:mb-3  max-lg:py-3 lg:mx-4 lg:rounded gap-2 items-center py-2 px-3 bg-gray-900 ">
        <ChatSendImage
          button={
            <button
              type="button"
              className="p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-200 "
            >
              <FaRegImage fontSize={20} />
            </button>
          }
        />
        <ChatSendFile button={<button
          type="button"
          className="p-2 text-gray-200 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-200 "
        >
          <GoPaperclip fontSize={20} />
        </button>} />
        
        <textarea
          id="chat text"
          rows="1"
          className="block outline-none mx-2 p-2.5 w-full text-sm  bg-gray-900  text-white   rounded-lg "
          placeholder="Your message..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></textarea>
        <button
          onClick={handleSendText}
          type="submit"
          className="inline-flex justify-center p-2 text-white rounded-full cursor-pointer hover:bg-gray-200 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
