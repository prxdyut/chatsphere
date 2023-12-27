import ChatBlockCentered from "./ChatBlockCentered";
import { Sent, RecievedWithoutAvatar as Recieved } from "./ChatMessage";
import { MessageFile, MessageImage, MessageText } from "./MessageContent";

export default function ChatAreaSingle(params) {
  return (
    <div className=" flex-grow p-4 flex gap-2 flex-col">
      <Recieved content={<MessageText />} />
      <Recieved content={<MessageImage />} />
      <ChatBlockCentered />
      <Sent content={<MessageText />} />
      <Sent content={<MessageImage />} />
      <Sent content={<MessageFile />} />
    </div>
  );
}
