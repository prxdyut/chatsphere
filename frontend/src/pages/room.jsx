import { useSearchParams } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Chats from "./chats";
import { useContext, useEffect } from "react";
import { ChatContext } from "../contexts/chat";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Signin from "./signin";

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
      <SignedOut>
        <Signin />
      </SignedOut>
      <SignedIn>
        <div className=" lg:hidden">
          <ChatContainer />
        </div>
        <div className=" max-lg:hidden">
          <Chats />
        </div>
      </SignedIn>
    </div>
  );
}
