import ChatBlockCentered from "./ChatBlockCentered";
import { Sent, RecievedWithAvatar as Recieved } from "./ChatMessage";

export default function ChatAreaMultiple(params) {
  return (
    <div className=" flex-grow p-4 flex gap-2 flex-col">
      <Recieved />
      <ChatBlockCentered />
      <Sent />
    </div>
  );
}
