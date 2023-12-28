import { BsShare, BsXLg } from "react-icons/bs";
import { CgBlock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import SharedMedia from "./ChatSharedMedia";
import SharedFiles from "./ChatSharedFiles";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { useContext } from "react";
import { UsersContext } from "../contexts/users";
import { ChatContext } from "../contexts/chat";
import { useAuth } from "@clerk/clerk-react";
export default function ChatInformation({ open, toggle }) {
  const { userId } = useAuth();
  const { multipleUsers, roomData } = useContext(ChatContext);
  const { findUser } = useContext(UsersContext);
  const roomUsers = roomData?.users
    ?.filter((id) => id != userId)
    ?.map((id) => findUser(id));
  return (
    <div
      className={` bg-black bg-opacity-50  z-50 p-4 fixed top-0 right-0 h-screen w-screen  items-center justify-center ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className=" bg-white p-4 flex gap-4 flex-col rounded  max-lg:w-3/4 w-1/3">
        <div className=" flex justify-end">
          <button
            onClick={toggle}
            className=" rounded-full p-2 hover:bg-gray-200"
          >
            <BsXLg fontSize={24} />
          </button>
        </div>
        <div className=" flex">
          {roomUsers
            ?.map((user) => user?.imageUrl)
            .map((url, i) => (
              <img
                key={i}
                className="inline-block h-12 w-12 rounded-full  object-cover ring-2 ring-white"
                src={url}
                alt=""
              />
            ))}
          <div>{/* <p className=" font-bold text-2xl">Pradyut Das</p> */}</div>
        </div>
        {multipleUsers ? (
          <div className="  flex flex-col flex-grow">
            <p className=" font-semibold flex-grow text-start">
              {roomData?.name}
            </p>
          </div>
        ) : (
          <div className=" flex flex-col flex-grow">
            <p className=" font-semibold flex-grow text-start">
              {roomUsers
                ?.map((user) => user?.firstName + " " + user?.lastName)
                .join(", ")}
            </p>
          </div>
        )}
        <div className=" flex gap-1 flex-col">
          <p className=" text-sm">
            {roomUsers
              ?.map((user) => user?.firstName + " " + user?.lastName)
              .join(", ")}
          </p>
          <p className=" text-sm mb-2">
            {roomUsers
              ?.map((user) => '@'+user?.username || user?.emailAddresses[0].emailAddress)
              .join(", ")}
          </p>
          <p className=" text-sm">Created : {new Date(roomData?.created).toLocaleDateString()}</p>
        </div>
        <SharedMedia withPreview />
        <SharedFiles withPreview />
        <div className=" flex justify-end gap-2">
          {/* <button
            onClick={() => {}}
            className="flex gap-2 uppercase text-xs font-semibold  bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded w-max"
          >
            <MdBlock fontSize={16} /> Block
          </button> */}

          <RWebShare
            data={{
              text: "@pradyut",
              url: `${window?.origin}/people?add=user`,
              title: "Pradyut Das",
            }}
          >
            <div className="flex gap-2 uppercase cursor-pointer text-xs font-semibold bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded w-max">
              <BsShare fontSize={16} /> Share Contact
            </div>
          </RWebShare>
        </div>
      </div>
    </div>
  );
}
