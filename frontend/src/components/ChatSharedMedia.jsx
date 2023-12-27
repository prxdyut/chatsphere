import FsLightbox from "fslightbox-react";
import React, { useEffect, useState } from "react";
import { BsShare, BsXLg } from "react-icons/bs";

export default function SharedMedia({ button, withPreview }) {
  const [toggler, setToggler] = useState(false);
  const [source, setSource] = useState(false);
  const [id] = useState(parseInt(Math.random() * 100));
  function Image() {
    return (
      <img
       
        onClick={() => {
          setSource(
            `https://images.pexels.com/photos/19551874/pexels-photo-19551874/free-photo-of-golden-retriever-in-christmas-headband.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
          );
          setToggler(Math.random());
        }}
        className=" aspect-square rounded object-cover"
        src="https://images.pexels.com/photos/19551874/pexels-photo-19551874/free-photo-of-golden-retriever-in-christmas-headband.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
            {[...Array(100)].map((x, i) => {
              return i < 4 && <React.Fragment key={i}><Image /></React.Fragment>;
            })}
            <label
              htmlFor={`media${id}`}
              className="  cursor-pointer bg-gray-900 rounded flex items-center justify-center text-white"
            >
              <p>+90</p>
            </label>
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
        <div className=" bg-white flex gap-4 flex-col rounded  max-lg:w-1/3 w-3/4 lg:max-h-96">
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
          <div className=" grid grid-cols-4 lg:grid-cols-7 pb-4 gap-2 max-h-96 overflow-y-auto pr-5 px-4">
            {[...Array(7)].map((x, i) => (
              <React.Fragment key={i}><Image /></React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <FsLightbox toggler={toggler} sources={[source]} />
    </div>
  );
}
