import { BsArrowLeft } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import SharedMedia from "./ChatSharedMedia";
import { FaRegImage } from "react-icons/fa6";
import SharedFiles from "./ChatSharedFiles";
import { GoPaperclip } from "react-icons/go";
import { useState } from "react";
export default function ChatHeaderSingle({ onClick }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState();
  const toggleOpen = () => setOpen(!open);

  return (
    <a className=" z-10 sticky top-0 px-4 py-3 max-lg:pl-1 cursor-pointer bg-gray-100  ">
      <div className=" flex align-middle gap-2 ">
        <button
          className=" px-1 hover:bg-gray-200 rounded lg:hidden"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack fontSize={24} />
        </button>
        <img
          className=" aspect-square h-12 rounded-full "
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div className=" flex  flex-grow  items-center relative">
          <div className=" pl-4 flex flex-col flex-grow" onClick={onClick}>
            <p className=" font-semibold flex-grow text-start">Pradyut Das</p>
            <p className="  text-sm text-start">Last Seen Today 12:30PM</p>
          </div>
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
              <MdInfoOutline fontSize={20} /> Personal Information{" "}
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
    </a>
  );
}
