import { SignInButton, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatContainer from "./components/ChatContainer";
import NavigationBar from "./components/NavigationBar";
import { Link, useLocation } from "react-router-dom";
import Signin from "./pages/signin";
import ImagePreview from "./components/ImagePreview";
import { useEffect } from "react";

import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";

export default function Layout({ children }) {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const handleClick = () => {
    pwaInstall({
      title: "Install Web App",
      logo: myLogo,
      features: (
        <ul>
          <li>Cool feature 1</li>
          <li>Cool feature 2</li>
          <li>Even cooler feature</li>
          <li>Works offline</li>
        </ul>
      ),
      description: "This is a very good app that does a lot of useful stuff. ",
    })
      .then(() =>
        alert("App installed successfully or instructions for install shown")
      )
      .catch(() => alert("User opted out from installing"));
  };

  useEffect(() => {
    const webpushrScript = document.createElement("script");
    webpushrScript.src = "/js/app.js";
    document.querySelector("body").appendChild(webpushrScript);
    const webpushrSubscribe = document.createElement("div");
    webpushrSubscribe.id = "webpushr-subscription-button";
    webpushrSubscribe.className = "hidden";
    document.querySelector("body").appendChild(webpushrSubscribe);
  }, []);

  return (
    <main className=" flex ">
      {/* <SignedOut>
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
      </SignedIn> */}
      <div>
        {supported() && !isInstalled() ? (
          <button type="button" onClick={handleClick}>
            Install App
          </button>
        ) : (
          <p>PWA uninstallable</p>
        )}
      </div>
    </main>
  );
}
