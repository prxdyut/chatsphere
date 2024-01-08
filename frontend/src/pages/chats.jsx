import ChatsList from "../components/ChatsList";
import ChatsSearch from "../components/ChatsSearch";
import Header from "../components/Header";
import Layout from "../layout";
import PeopleNew from "../components/PeopleNew";
import ChatsNew from "../components/ChatsNew";
import { useContext } from "react";
import { ChatContext } from "../contexts/chat";

export default function Chats() {

  return (
    <Layout>
      <div className="  col-span-2  h-screen overflow-auto px-4">
        <div className=" sticky top-0 z-10 bg-white mb-4">
          <Header title={"Chatrooms"} />
          <ChatsSearch />
        </div>
        <div className=" flex gap-2 items-end justify-end">
          <ChatsNew />
          <PeopleNew />
        </div>
        <ChatsList />
        <div className=" h-16 w-screen  col-span-7 hidden max-lg:block "></div>
      </div>
    </Layout>
  );
}
