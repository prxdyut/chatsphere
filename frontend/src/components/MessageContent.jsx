import { MdFilePresent } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import getFileType from './../helper/getFileType'
import convertBytes from './../helper/convertBytes'
import { Link } from "react-router-dom";
export function MessageText({ content }) {
  return (
    <p className=" cursor-default opacity-80 hover:opacity-100">{content}</p>
  );
}

export function MessageImage({ content, fileUrl }) {
  const [toggler, setToggler] = useState(false);

  return (
    <div className=" -ml-2 -mr-3 w-52  max-lg:max-w-[50vw] lg:w-60 ">
      <div className=" relative group">
        {" "}
        <img
          onClick={() => setToggler(!toggler)}
          className=" rounded-lg cursor-pointer"
          src={fileUrl}
        />
        <div className=" absolute bottom-0 right-0  p-2  hidden border-2 cursor-pointer rounded-full group-hover:rounded-none group-hover:rounded-tl-full   group-hover:block bg-gray-900 text-white pl-4 pt-4">
          <LuDownload fontSize={20} />
        </div>
      </div>

      <FsLightbox
        toggler={toggler}
        sources={[
          "https://chatsphere.s3.ap-south-1.amazonaws.com/ima-logo.jpg",
        ]}
      />
      <p className=" mt-2 text-xs opacity-60 cursor-default hover:opacity-100">
        {content}
      </p>
    </div>
  );
}

export function MessageFile({ content, fileUrl, fileType, fileSize }) {
  

  return (
    <a className=" " href={fileUrl} target="_blank" >
      <div className="hover:bg-gray-200 group cursor-pointer -ml-2 -mr-3 w-52  max-lg:max-w-[50vw] lg:w-60  flex items-end p-2 rounded-lg bg-white  gap-1">
        <div className=" flex flex-col gap-1">
          <p className=" text-xs text-left">{convertBytes(fileSize)}</p>
          <p className=" text-sm font-bold text-left text uppercase">{getFileType(fileUrl)}</p>
        </div>
        <div className=" flex-grow" />
        <div className=" p-2 rounded-full border-2 cursor-pointer  group-hover:bg-gray-900 group-hover:text-white">
          <LuDownload fontSize={20} />
        </div>
      </div>{" "}
      <p className=" mt-2 text-xs opacity-60 cursor-default hover:opacity-100">
        {content}
      </p>
    </a>
  );
}
