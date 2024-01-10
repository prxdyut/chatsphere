import { SignInButton, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatContainer from "./components/ChatContainer";
import NavigationBar from "./components/NavigationBar";
import { Link, useLocation } from "react-router-dom";
import Signin from "./pages/signin";
import ImagePreview from "./components/ImagePreview";
import Notification from "./components/Notifications";
import { onMessageListener, requestForToken } from "./utils/firebase";
import { getMessaging } from "firebase/messaging";

export default function Layout({ children }) {
  requestForToken();
  
  onMessageListener()
    .then((payload) => {
      alert(JSON.stringify(payload));
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));
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
