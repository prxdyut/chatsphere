import { useContext, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Divider from "./Divider";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { BsXLg } from "react-icons/bs";
import { RWebShare } from "react-web-share";
import { RiErrorWarningLine } from "react-icons/ri";
import addToContact from "../helper/addToContact";
import { IoCheckmarkDone } from "react-icons/io5";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PeopleContext } from "../contexts/people";
import { UsersContext } from "../contexts/users";

export default function PeopleNew() {
  const { userId } = useAuth();
  const { users } = useContext(UsersContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { reloadPeople } = useContext(PeopleContext);
  const { user } = useUser();
  const add = () => {
    setOpen(true);
    setInput(searchParams.get("add"));
    addToContact(
      searchParams.get("add").trim(),
      userId,
      setError,
      setSuccess,
      reloadPeople,
      users
    );
  };

  useEffect(() => {
    searchParams.has("add") && add();
  }, [searchParams]);
  return (
    <div className=" flex  justify-end mb-4 group">
      <button
        onClick={toggleOpen}
        className=" flex gap-2 text-xs uppercase font-bold bg-gray-700 hover:bg-gray-900 text-white   p-2 rounded justify-center items-center"
      >
        <IoAddOutline fontSize={20} /> Contact
      </button>
      <div
        className={` bg-black bg-opacity-50  z-50 p-4 fixed top-0 right-0 h-screen w-screen  items-center justify-center ${
          open ? "flex" : "hidden"
        }`}
      >
        <div className=" bg-white p-4 flex gap-4 flex-col rounded  max-lg:w-3/4 w-1/3">
          <div className=" flex justify-end">
            <button
              onClick={toggleOpen}
              className=" rounded-full p-2 hover:bg-gray-200"
            >
              <BsXLg fontSize={24} />
            </button>
          </div>
          <p className=" font-bold text-xl">Invite People</p>{" "}
          <p className="  text-sm opacity-75">
            Share your unique Invite Link with your Friends
          </p>{" "}
          <RWebShare
            data={{
              text: "@pradyut",
              url: `${window?.origin}/people?add=${user.username}`,
              title: "Pradyut Das",
            }}
          >
            <div className=" relative group">
              <input
                value={`${window?.origin}/people?add=pradyut`}
                readOnly
                className="px-3 w-full py-2 outline-none group-hover:outline bg-gray-100 hover:bg-gray-200 rounded opacity-80 text-sm pr-10"
              ></input>
              <button className=" absolute top-2 rounded right-2 p-1 ">
                <IoMdShare />
              </button>
            </div>
          </RWebShare>
          <Divider title={"Or"} />
          <p className=" font-bold text-xl">Add People</p>
          <p className="  text-sm opacity-75">
            Ask Your Friends to share their Username or Email
          </p>
          <div>
            <input
              placeholder="Username or Email"
              className="px-3 py-2 bg-gray-200 rounded mb-1 w-full"
              onChange={(e) => setInput(e.target.value.toLowerCase())}
              value={input}
              onKeyUp={(e) => {
                if (e.key == "Enter")
                  addToContact(
                    input,
                    userId,
                    setError,
                    setSuccess,
                    reloadPeople,
                    users
                  );
              }}
            ></input>
            {error && (
              <p className=" text-red-500 text-xs flex gap-1 items-center">
                <RiErrorWarningLine /> {error}
              </p>
            )}
            {success && (
              <p className=" text-green-500 text-xs flex gap-1 items-center">
                <IoCheckmarkDone /> {success}
              </p>
            )}
          </div>
          <div className=" flex justify-end">
            <button
              onClick={() =>
                addToContact(
                  input.trim(),
                  userId,
                  setError,
                  setSuccess,
                  reloadPeople,
                  users
                )
              }
              className="flex gap-2 uppercase text-xs font-semibold bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded w-max"
            >
              <LuSearch className=" " fontSize={16} /> Find
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
