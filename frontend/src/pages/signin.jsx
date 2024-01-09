import { SignIn, SignUp } from "@clerk/clerk-react";
import logo from "../assets/logo/main.svg";
import { useState } from "react";

export default function Signin() {
  const [signin, setSignin] = useState(false);
  return (
    <div className=" h-screen w-screen grid lg:grid-cols-2 max-lg:flex  justify-items-center max-lg:flex-col">
      <div className=" lg:h-full w-full bg-gray-900 max-lg:hidden">
        <img src={logo} className=" h-full w-full max-lg:h-60 aspect-square" />
      </div>
      {signin ? (
        <div className=" gap-6 py-4 max-lg:flex-grow flex flex-col lg:w-96 items-center justify-center signin-page">
          
          <button onClick={() => setSignin(!signin)} className=" bg-black text-white text-xs uppercase font-semibold w-3/4 py-3 rounded">
            Create Account
          </button>
          <p>or</p><SignIn />
        </div>
      ) : (
        <div className=" gap-6 py-4 max-lg:flex-grow flex flex-col lg:w-96 items-center justify-center signin-page">
          
          <button onClick={() => setSignin(!signin)} className=" bg-black text-white text-xs uppercase font-semibold w-3/4 py-3 rounded">
            Login existing account
          </button>
          <p>or</p><SignUp />
        </div>
      )}
    </div>
  );
}
