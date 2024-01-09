import Header from "../components/Header";
import Layout from "../layout";
import { UserProfile, useAuth } from "@clerk/clerk-react";
import SignoutButton from "../components/SignOutButton";
import { useEffect, useLayoutEffect } from "react";

export default function Profile() {
  const { signOut } = useAuth();
  useEffect(() => {
    if (
      Notification.permission !== "granted"
    ) {
      document.querySelector("#notifButton")?.classList.remove("hidden");
    }
  }, []);
  return (
    <Layout>
      <div className="col-span-2 flex flex-col max-h-screen profile-page overflow-auto px-4">
        <div className=" sticky top-0 z-10 bg-white mb-4">
          <Header title={"Profile"} />
        </div>{" "}
        <UserProfile />
        <div className=" text-right">
          <SignoutButton />
        </div>
        <div className=" text-right mt-4">
          <button
            onClick={() => {
              document.getElementById("webpushr-subscription-button").click();
            }}
            id="notifButton"
            className=" bg-black text-white uppercase text-xs font-semibold rounded w-max py-2 px-4"
          >
            Turn On Notifications
          </button>
        </div>
      </div>
    </Layout>
  );
}
