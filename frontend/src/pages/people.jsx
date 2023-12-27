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
import PeopleList from "../components/PeopleList";
import PeopleNew from "../components/PeopleNew";

export default function People() {
  return (
    <Layout>
      <div className="  col-span-2 h-screen overflow-y-auto overflow-auto px-4">
        <div className=" sticky top-0 z-10 bg-white mb-4">
          <Header title={"People"} />
          <ChatsSearch />
        </div>
        <PeopleNew />
        <PeopleList />
        <div className=" h-16 max-lg:w-screen  max-lg:col-span-7"></div>
      </div>
    </Layout>
  );
}
