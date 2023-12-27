import { BsShare, BsXLg } from "react-icons/bs";
import { CgBlock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import SharedMedia from "./ChatSharedMedia";
import SharedFiles from "./ChatSharedFiles";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
export default function ChatInformation({ open, toggle }) {
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
        <div className=" flex gap-4">
          <img
            src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJhMlFqbWR3S1lWMEc0VTcwd3hHdFA1YWVOTCJ9"
            className=" rounded-full aspect-square h-20 object-cover"
          />
          <div>{/* <p className=" font-bold text-2xl">Pradyut Das</p> */}</div>
        </div>
        <p className=" font-bold text-2xl">Pradyut Das</p>
        <div className=" flex gap-1 flex-col">
          <p className=" text-sm">@pradyut</p>
          <p className=" text-sm">daspradyut516@gmail.com</p>
          <p className=" text-sm">Joined : {new Date().toLocaleDateString()}</p>
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
