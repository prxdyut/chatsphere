import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatContainer from "./components/ChatContainer";
import NavigationBar from "./components/NavigationBar";
import { Link } from "react-router-dom";
import Signin from "./pages/signin";

export default function Layout({ children }) {
  return (
    <main className=" flex ">
      <SignedOut>
        <Signin />
      </SignedOut>
      <SignedIn>
        <NavigationBar />
        <div className=" grid grid-cols-7 w-full">
          <div className="max-lg:col-span-7 col-span-2">{children}</div>
          <div className=" max-lg:hidden col-span-5">
            <ChatContainer />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
