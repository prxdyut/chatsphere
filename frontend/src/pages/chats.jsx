import NavigationBar from "../components/NavigationBar";
import ChatsList from "../components/ChatsList";
import ChatsSearch from "../components/ChatsSearch";
import ChatBar from "../components/ChatBar";
// import ChatAreaSingle from "../components/ChatAreaSingleSingle";

import ChatAreaMultiple from "../components/ChatAreaMultiple";
import ChatHeaderSingle from "../components/ChatHeaderSingle";
import ChatHeaderMultiple from "../components/ChatHeaderMultiple";
import Header from "../components/Header";
import { useContext, useState } from "react";
import ChatAreaSingle from "../components/ChatAreaSingle";
import ChatContainer from "../components/ChatContainer";
import Layout from "../layout";
import { IoAddOutline } from "react-icons/io5";
import PeopleNew from "../components/PeopleNew";
import { useAuth } from "@clerk/clerk-react";
import ChatsNew from "../components/ChatsNew";
import { RoomsContext } from "../contexts/rooms";

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
