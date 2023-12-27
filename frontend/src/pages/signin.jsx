import { SignIn } from "@clerk/clerk-react";
import logo from "../assets/logo/main.svg";

export default function Signin() {
  return (
    <div className=" h-screen w-screen grid lg:grid-cols-2 max-lg:flex  justify-items-center max-lg:flex-col">
      <div className=" lg:h-full w-full bg-gray-900">
        <img src={logo} className=" h-full w-full max-lg:h-60 aspect-square" />
      </div>
      <div className=" max-lg:flex-grow flex lg:w-96 items-center justify-center signin-page">
        <SignIn />
      </div>
    </div>
  );
}
