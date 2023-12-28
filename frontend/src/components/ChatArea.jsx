import { useContext } from "react";
import ChatBlockCentered from "./ChatBlockCentered";
import { Sent, Recieved } from "./ChatMessage";
import { MessageFile, MessageImage, MessageText } from "./MessageContent";
import { ChatContext } from "../contexts/chat";
import { useAuth } from "@clerk/clerk-react";

export default function ChatArea() {
  const { messages } = useContext(ChatContext);
  const { userId } = useAuth();

  return (
    <div className=" flex-grow p-4 flex gap-2 flex-col">
      {messages.map((message, index) => {
        let content = <></>;
        if (message.type == "text") content = <MessageText {...message} />;
        if (message.type == "image") content = <MessageImage {...message} />;
        if (message.type == "file") content = <MessageFile {...message} />;

        switch (message.userId) {
          case userId:
            return <Sent key={index} content={content} created={message?.created} />;
          default:
            return <Recieved key={index} content={content} created={message?.created} />;
            break;
        }
      })}
      {/* <Recieved content={<MessageText />} />
      <Recieved content={<MessageImage />} />
      <ChatBlockCentered />
      <Sent content={<MessageText />} />
      <Sent content={<MessageImage />} /> */}
      {/* <Sent content={<MessageFile />} /> */}
    </div>
  );
}
