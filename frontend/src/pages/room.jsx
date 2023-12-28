import { useSearchParams } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Chats from "./chats";
import { useContext, useEffect } from "react";
import { ChatContext } from "../contexts/chat";

export default function Room() {
  const { setRoom } = useContext(ChatContext);
  let [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has("roomId")) {
      setRoom(searchParams.get("roomId"));
    }
  }, [searchParams]);

  return (
    <div>
      <div className=" lg:hidden">
        <ChatContainer />
      </div>
      <div className=" max-lg:hidden">
        <Chats />
      </div>
    </div>
  );
}
