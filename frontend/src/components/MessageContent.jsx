import { MdFilePresent } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

export function MessageText() {
  return (
    <p className=" cursor-default opacity-80 hover:opacity-100">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  );
}

export function MessageImage() {
  const [toggler, setToggler] = useState(false);

  return (
    <div className=" -ml-2 -mr-3 w-52  max-lg:max-w-[50vw] lg:w-60 relative group">
      <img
        onClick={() => setToggler(!toggler)}
        className=" rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/18944183/pexels-photo-18944183/free-photo-of-schloss-in-bnw.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className=" absolute bottom-0 right-0  p-2  hidden border-2 cursor-pointer rounded-full group-hover:rounded-none group-hover:rounded-tl-full   group-hover:block bg-gray-900 text-white pl-4 pt-4">
        <LuDownload fontSize={20} />
      </div>
      <FsLightbox
        toggler={toggler}
        sources={["https://i.imgur.com/fsyrScY.jpg"]}
      />
    </div>
  );
}

export function MessageFile() {
  return (
    <div className="hover:bg-gray-200 group cursor-pointer -ml-2 -mr-3 w-52  max-lg:max-w-[50vw] lg:w-60  flex items-end p-2 rounded-lg bg-white  gap-1">
      <div className=" flex flex-col gap-1">
        <p className=" text-xs">A Good File Title</p>
        <p className=" text-sm font-bold uppercase">pdf</p>
      </div>
      <div className=" flex-grow" />
      <div className=" p-2 rounded-full border-2 cursor-pointer  group-hover:bg-gray-900 group-hover:text-white">
        <LuDownload fontSize={20} />
      </div>
    </div>
  );
}
