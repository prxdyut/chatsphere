import React, { useContext, useEffect, useState } from "react";
import { IoAddOutline, IoCheckmarkDone } from "react-icons/io5";
import { BsXLg } from "react-icons/bs";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { PeopleContext } from "../contexts/people";
import { TbMessageCircle2 } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import newRoom from "../helper/newRoom";
import { RoomsContext } from "../contexts/rooms";
import PeopleNew from "./PeopleNew";
import { ChatContext } from "../contexts/chat";
import newMember from "../helper/newMember";

function PeopleList({ selected, setSelected }) {
  const { people: AllPeople } = useContext(PeopleContext);
  const { room, roomData } = useContext(ChatContext);
  const people = AllPeople.filter(({ id }) => !roomData?.users.includes(id));

  function Person({ name, imageUrl, id }) {
    return (
      <div
        onClick={() => {
          selected.includes(id)
            ? setSelected([...selected.filter((id_) => id != id_)])
            : setSelected([...selected, id]);
        }}
        className={`" cursor-pointer block p-2 rounded  w-full ${
          selected.includes(id)
            ? "hover:bg-gray-900 bg-gray-700 text-white"
            : "hover:bg-gray-200"
        } "`}
      >
        <div className=" flex align-middle justify-center items-center">
          <img
            className=" aspect-square h-10 w-10 rounded-full  object-cover"
            src={imageUrl}
            alt=""
          />
          <div className=" pl-4 flex-grow gap-1 flex flex-col  justify-center">
            <p className=" font-semibold flex-grow text-start">{name} </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 flex flex-col gap-2">
      {people.length > 0 ? (
        people.map((data, i) => (
          <React.Fragment key={i}>
            <Person {...data} />
          </React.Fragment>
        ))
      ) : (
        <div className=" p-4 flex flex-col gap-2 items-center justify-center">
          <p>Add Contacts to Make a room</p>
          <PeopleNew />
        </div>
      )}
    </div>
  );
}

export default function ChatsAddToRoom() {
  const { userId } = useAuth();
  const { rooms, setRooms, reloadRooms } = useContext(RoomsContext);
  const { room, roomData, loadRoom } = useContext(ChatContext);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const navigate = useNavigate();

  useEffect(() => {
    setSelected([]);
  }, [open]);

  useEffect(() => {
    setError("");
  }, [selected]);

  return (
    <div className=" flex  justify-end mb-4 group">
      <button
        onClick={toggleOpen}
        className=" flex gap-2 text-xs uppercase font-bold bg-gray-700 hover:bg-gray-900 text-white   p-2 rounded justify-center items-center"
      >
        <IoAddOutline fontSize={20} /> New Member
      </button>
      <div
        className={` bg-black bg-opacity-50  z-50 p-4 fixed top-0 right-0 h-screen w-screen  items-center justify-center ${
          open ? "flex" : "hidden"
        }`}
      >
        <div className=" bg-white p-4 flex gap-4 flex-col rounded  max-lg:w-5/6 w-1/2">
          <div className=" flex justify-between  items-center">
            <p className=" text-xl font-bold">New Member</p>
            <button
              onClick={toggleOpen}
              className=" rounded-full p-2 hover:bg-gray-200"
            >
              <BsXLg fontSize={24} />
            </button>
          </div>
          <div className=" max-h-60 overflow-y-scroll">
            <PeopleList selected={selected} setSelected={setSelected} />
          </div>
          {error && (
            <p className=" text-red-500 w-full text-xs flex gap-1 items-right justify-end">
              <RiErrorWarningLine /> {error}
            </p>
          )}
          {success && (
            <p className=" text-green-500 text-xs flex gap-1 items-center justify-end">
              <IoCheckmarkDone /> {success}
            </p>
          )}
          <div className=" flex gap-2 justify-end">
            <PeopleNew />
            <button
              onClick={() =>
                newMember(selected, room, setError, setSuccess, () => {
                  loadRoom();
                  reloadRooms();
                })
              }
              className="flex h-max gap-2 uppercase text-xs font-semibold bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded w-max"
            >
              <TbMessageCircle2 className=" " fontSize={16} /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
