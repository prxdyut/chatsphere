import FsLightbox from "fslightbox-react";
import React, { useContext, useEffect, useState } from "react";
import { BsShare, BsXLg } from "react-icons/bs";
import { ChatContext } from "../contexts/chat";

export default function SharedMedia({ button, withPreview }) {
  const [toggler, setToggler] = useState(false);
  const [source, setSource] = useState(false);
  const [id] = useState(parseInt(Math.random() * 100));
  const { messages } = useContext(ChatContext);
  const imageMessages = messages.filter((message) => message.type == "image");

  function Image({ url }) {
    return (
      <img
        onClick={() => {
          setSource(url);
          setToggler(Math.random());
        }}
        className=" aspect-square rounded object-cover"
        src={url}
      />
    );
  }
  return (
    <div>
      <label htmlFor={`media${id}`}>{button}</label>
      {withPreview && (
        <div>
          <div className=" flex items-center justify-between">
            <p className=" mb-1 font-semibold">Shared Media</p>
            <label
              htmlFor={`media${id}`}
              className=" underline  opacity-75 text-sm cursor-pointer"
            >
              View All
            </label>
          </div>
          <div className=" grid grid-cols-5 gap-2 ">
            {imageMessages.map((message, i) => {
              return (
                i < 4 && (
                  <React.Fragment key={i}>
                    <Image url={message.fileUrl} />
                  </React.Fragment>
                )
              );
            })}
            {imageMessages.length - 4 > 0 && (
              <label
                htmlFor={`media${id}`}
                className="  cursor-pointer bg-gray-900 rounded flex items-center justify-center text-white"
              >
                <p>+{imageMessages.length - 4}</p>
              </label>
            )}
          </div>
        </div>
      )}
      <input
        type="checkbox"
        id={`media${id}`}
        className={`" peer/media hidden "`}
      />
      <div
        className={` bg-black bg-opacity-50  z-60 p-2 fixed top-0 right-0 h-screen w-screen  items-center justify-center hidden  peer-checked/media:flex`}
      >
        <div className=" bg-white flex gap-4 flex-col rounded  max-lg:w-5/6 w-3/4 lg:max-h-96">
          <div className=" flex p-4 pb-0">
            <p className=" font-bold text-xl">Shared Media</p>
            <div className=" flex-grow" />
            <label
              htmlFor={`media${id}`}
              className=" cursor-pointer rounded-full p-2 hover:bg-gray-200"
            >
              <BsXLg fontSize={24} />
            </label>
          </div>
          <div className=" grid grid-cols-3 lg:grid-cols-7 pb-4 gap-2 max-h-96 overflow-y-auto pr-5 px-4">
            {imageMessages.length > 0 ? (
              imageMessages.map((message, i) => (
                <React.Fragment key={i}>
                  <Image url={message.fileUrl} />
                </React.Fragment>
              ))
            ) : (
              <p className=" col-span-3 lg:col-span-7">
                Images have not been shared yet!
              </p>
            )}
          </div>
        </div>
      </div>
      <FsLightbox toggler={toggler} sources={[source]} />
    </div>
  );
}
