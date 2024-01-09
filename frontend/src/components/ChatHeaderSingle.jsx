import { BsArrowLeft } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import SharedMedia from "./ChatSharedMedia";
import { FaRegImage } from "react-icons/fa6";
import SharedFiles from "./ChatSharedFiles";
import { GoPaperclip } from "react-icons/go";
import { useContext, useState } from "react";
import { ChatContext } from "../contexts/chat";
import { UsersContext } from "../contexts/users";
import { useAuth } from "@clerk/clerk-react";
export default function ChatHeader({ onClick }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState();
  const toggleOpen = () => setOpen(!open);
  const { userId } = useAuth();
  const { multipleUsers, roomData, status } = useContext(ChatContext);
  const { findUser } = useContext(UsersContext);
  const roomUsers = roomData?.users
    ?.filter((id) => id != userId)
    ?.map((id) => findUser(id));

  return (
    <div className=" z-10 sticky top-0 px-4 py-3 max-lg:pl-1 cursor-pointer bg-gray-100  ">
      <div
        className={`" flex ${
          multipleUsers && "flex-col"
        } align-middle  gap-2 "`}
      >
        <div className="flex overflow-hidden">
          <button
            className=" px-1 hover:bg-gray-200 rounded mr-2 lg:hidden"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack fontSize={24} />
          </button>
          <div className=" p-1">
            {roomUsers
              ?.map((user) => user?.imageUrl)
              .map((url, i) => (
                <img
                  key={i}
                  className="inline-block  h-10 w-10 rounded-full  object-cover"
                  src={url}
                  alt=""
                />
              ))}
          </div>
        </div>
        <div className=" flex  flex-grow  items-center relative">
          {multipleUsers ? (
            <div
              className=" flex flex-col flex-grow max-lg:ml-10"
              onClick={onClick}
            >
              <p className=" font-semibold flex-grow text-start">
                {roomData?.name}
              </p>
              <p className="  text-sm text-start">
                {roomData.users
                  .map(
                    (user) =>
                      status[user] == "online" &&
                      user != userId &&
                      findUser(user)?.firstName
                  )
                  .filter((_) => _)
                  .join(" ")}
                {roomData.users
                  .map((user) => status[user] == "online" && user != userId)
                  .filter((_) => _).length == 1 && "  is"}
                {roomData.users
                  .map((user) => status[user] == "online" && user != userId)
                  .filter((_) => _).length > 1 && "  are"}{" "}
                Online
              </p>
            </div>
          ) : (
            <div className=" pl-4 flex flex-col flex-grow" onClick={onClick}>
              <p className=" font-semibold flex-grow text-start">
                {roomUsers
                  ?.map((user) => user?.firstName + " " + user?.lastName)
                  .join(", ")}
              </p>
              {roomUsers?.map((user) =>
                user != userId && status[user?.id] == "online"
                  ? "Online"
                  : status[user?.id] && (
                      <p className=" text-xs">
                        Last Seen &nbsp;
                        {Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          weekday: "short",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }).format(new Date(status[user?.id]))}
                      </p>
                    )
              )}
            </div>
          )}
          <button
            onClick={toggleOpen}
            className="absolute right-0  cursor-pointer hover:bg-gray-900 rounded p-2 hover:text-white"
          >
            <PiDotsThreeOutlineVerticalFill fontSize={18} />
          </button>
          <div
            className={`" rounded border  flex-col gap-1  bg-white absolute top-10 right-0 p-1 ${
              open ? "flex" : "hidden"
            } "`}
          >
            <button
              onClick={onClick}
              className=" flex gap-2 items-center  hover:bg-gray-200 px-4 py-2 border  rounded-lg"
            >
              <MdInfoOutline fontSize={20} /> More Information{" "}
            </button>
            <SharedMedia
              button={
                <div className=" cursor-pointer flex gap-2 items-center  hover:bg-gray-200 px-4 py-2 border  rounded-lg">
                  <FaRegImage fontSize={20} /> Shared Media
                </div>
              }
            />
            <SharedFiles
              button={
                <div className=" cursor-pointer flex gap-2 items-center  hover:bg-gray-200 px-4 py-2 border  rounded-lg">
                  <GoPaperclip fontSize={20} /> Shared Files
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
