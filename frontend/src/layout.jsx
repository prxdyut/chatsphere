import { SignInButton, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatContainer from "./components/ChatContainer";
import NavigationBar from "./components/NavigationBar";
import { Link, useLocation } from "react-router-dom";
import Signin from "./pages/signin";
import ImagePreview from "./components/ImagePreview";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    const webpushrScript = document.createElement("script");
    webpushrScript.src = "/js/app.js";
    document.querySelector("body").appendChild(webpushrScript);
    const webpushrSubscribe = document.createElement("div");
    webpushrSubscribe.id = "webpushr-subscription-button";
    webpushrSubscribe.className = 'hidden'
    document.querySelector("body").appendChild(webpushrSubscribe);
  }, []);

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
        <ImagePreview />
      </SignedIn>
    </main>
  );
}
