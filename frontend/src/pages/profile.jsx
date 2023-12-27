// import ChatAreaSingle from "../components/ChatAreaSingleSingle";
import React from "react";
import Header from "../components/Header";
import Layout from "../layout";
import { SignOutButton, UserProfile, useAuth } from "@clerk/clerk-react";
import SignoutButton from "../components/SignOutButton";

export default function Profile() {
  const { signOut } = useAuth();
  return (
    <Layout>
      <div className="col-span-2 flex flex-col max-h-screen profile-page overflow-auto px-4">
        <div className=" sticky top-0 z-10 bg-white mb-4">
          <Header title={"Profile"} />
        </div>{" "}
        <UserProfile />
        <div className=" text-right">
          <SignoutButton/>
        </div>
      </div>
    </Layout>
  );
}
