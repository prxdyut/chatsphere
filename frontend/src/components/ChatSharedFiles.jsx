import FsLightbox from "fslightbox-react";
import React, { useEffect, useState } from "react";
import { BsShare, BsXLg } from "react-icons/bs";
import { FaPaperclip } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SharedFiles({ button, withPreview }) {
  const [id] = useState(parseInt(Math.random() * 100));
  function File({preview}) {
    return (
      <div className=" w-full h-full flex flex-col items-center rounded justify-center gap-1 bg-gray-200 aspect-square">

        <p className={`" uppercase font-semibold ${preview && 'text-xs'}"`}>PPT</p>
        <p className={`"  text-xs opacity-75  text-center w-3/4 ${preview && 'hidden'} "`}>A Good File Name</p>
      </div>
    );
  }
  return (
    <div>
      <label htmlFor={`files${id}`}>{button}</label>
      {withPreview && (
        <div>
          <div className=" flex items-center justify-between">
            <p className=" mb-1 font-semibold">Shared Files</p>
            <label
              htmlFor={`files${id}`}
              className=" underline  opacity-75 text-sm cursor-pointer"
            >
              View All
            </label>
          </div>
          <div className=" grid grid-cols-5 gap-2 ">
            {[...Array(100)].map((x, i) => {
              return i < 4 && <React.Fragment key={i}><File preview={true} /></React.Fragment>;
            })}
            <label
              htmlFor={`files${id}`}
              className="  cursor-pointer bg-gray-900 rounded flex items-center justify-center text-white"
            >
              <p>+90</p>
            </label>
          </div>
        </div>
      )}
      <input
        type="checkbox"
        id={`files${id}`}
        className={`" peer/media hidden "`}
      />
      <div
        className={` bg-black bg-opacity-50  z-60 p-2 fixed top-0 right-0 h-screen w-screen  items-center justify-center hidden  peer-checked/media:flex`}
      >
        <div className=" bg-white flex gap-4 flex-col rounded  max-lg:w-1/3 w-3/4 lg:max-h-96">
          <div className=" flex p-4 pb-0">
            <p className=" font-bold text-xl">Shared Files</p>
            <div className=" flex-grow" />
            <label
              htmlFor={`files${id}`}
              className=" cursor-pointer rounded-full p-2 hover:bg-gray-200"
            >
              <BsXLg fontSize={24} />
            </label>
          </div>
          <div className=" grid grid-cols-4 lg:grid-cols-7 pb-4 gap-2 max-h-96 overflow-y-auto pr-5 px-4">
            {[...Array(100)].map((x, i) => (
              <React.Fragment key={i}><File /></React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
