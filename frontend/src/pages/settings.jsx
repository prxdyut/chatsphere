import NavigationBar from "../components/NavigationBar";
import ChatsList from "../components/ChatsList";
import ChatsSearch from "../components/ChatsSearch";
import ChatBar from "../components/ChatBar";
// import ChatAreaSingle from "../components/ChatAreaSingleSingle";

import ChatAreaMultiple from "../components/ChatAreaMultiple";
import ChatHeaderSingle from "../components/ChatHeaderSingle";
import ChatHeaderMultiple from "../components/ChatHeaderMultiple";
import Header from "../components/Header";
import { useState } from "react";
import ChatAreaSingle from "../components/ChatAreaSingle";
import ChatContainer from "../components/ChatContainer";
import Layout from "../layout";
import { UserProfile } from "@clerk/clerk-react";

export default function Settings() {
  return (
    <Layout>
      <div className="col-span-2 flex flex-col gap-2 max-h-screen settings-page overflow-auto px-4">
        <div className=" sticky top-0 z-10 bg-white mb-4">
          <Header title={"Settings"} />
        </div>{" "}
        <UserProfile />
      </div>
    </Layout>
  );
}
