import { IoIosArrowBack } from "react-icons/io";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../contexts/chat";
import { useContext } from "react";
export default function ChatHeaderMultiple({onClick}) {
  const { multipleUsers } = useContext(ChatContext);
  const navigate = useNavigate();

  return (
    <a className=" z-10 sticky top-0 px-4 py-3 cursor-pointer bg-gray-100  ">
      <div
        className={`" flex ${
          multipleUsers && "flex-col"
        } align-middle  max-lg:gap-4 "`}
      >
        <div className="flex -ml-2 overflow-hidden">
          <button
            className=" px-1 hover:bg-gray-200 rounded mr-2 lg:hidden"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack fontSize={24} />
          </button>
          {Array(1)
            .fill(
              "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            )
            .map((url) => (
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={url}
                alt=""
              />
            ))}
        </div>
        <div className=" flex  flex-grow  items-center relative">
          <div className=" lg:pl-4 flex flex-col flex-grow">
            <p className=" font-semibold flex-grow text-start">Room Name</p>
            <p className="  text-sm text-start">
              Pradyut, Shrish & Ujwal are Online
            </p>
          </div>
          <button className=" absolute right-0 hover:bg-gray-900 rounded p-2 hover:text-white">
            <PiDotsThreeOutlineVerticalFill fontSize={18} />
          </button>
        </div>
      </div>
    </a>
  );
}
