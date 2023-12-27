import React, { useContext, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Divider from "./Divider";
import { BsXLg } from "react-icons/bs";
import { useAuth } from "@clerk/clerk-react";
import {
  redirect,
  redirectDocument,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { PeopleContext } from "../contexts/people";
import { checkInTheArrayIfTheFirstLetterMatches } from "../helper/checkInTheArrayIfTheFirstLetterMatches";
import { LuSearch } from "react-icons/lu";
import { TbMessageCircle2 } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import newRoom from "../helper/newRoom";
import { RoomsContext } from "../contexts/rooms";

function PeopleList({ selected, setSelected }) {
  const { people } = useContext(PeopleContext);

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
      {people.map((data, i) => (
        <React.Fragment key={i}>
          <Person {...data} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default function ChatsNew() {
  const { userId } = useAuth();
  const { rooms, setRooms } = useContext(RoomsContext);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const toggleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  useEffect(() => {
    setSelected([]);
  }, [open]);

  const existingChats = rooms
    .filter((room) => room.users.length == 2)
    .map(({ users }) => users)
    .flatMap((id) => id)
    .filter((id) => id != userId);

  const ROOM_EXISTS =
    selected.length == 1 &&
    existingChats.map((id) => selected.includes(id)).includes(true);

  useEffect(() => {
    setError("");
  }, [selected]);

  return (
    <div className=" flex  justify-end mb-4 group">
      <button
        onClick={toggleOpen}
        className=" flex gap-2 text-xs uppercase font-bold bg-gray-700 hover:bg-gray-900 text-white   p-2 rounded justify-center items-center"
      >
        <IoAddOutline fontSize={20} /> Room
      </button>
      <div
        className={` bg-black bg-opacity-50  z-50 p-4 fixed top-0 right-0 h-screen w-screen  items-center justify-center ${
          open ? "flex" : "hidden"
        }`}
      >
        <div className=" bg-white p-4 flex gap-4 flex-col rounded  max-lg:w-3/4 w-1/3">
          <div className=" flex justify-between  items-center">
            <p className=" text-xl font-bold">Create New Room</p>
            <button
              onClick={toggleOpen}
              className=" rounded-full p-2 hover:bg-gray-200"
            >
              <BsXLg fontSize={24} />
            </button>
          </div>
          <input
            className=" border outline-none bg-gray-200 px-3 py-2 rounded"
            placeholder="Name of Room (Optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className=" max-h-60 overflow-y-scroll">
            <PeopleList selected={selected} setSelected={setSelected} />
          </div>
          {error && (
            <p className=" text-red-500 w-full text-xs flex gap-1 items-right justify-end">
              <RiErrorWarningLine /> {error}
            </p>
          )}
          {ROOM_EXISTS && (
            <p className=" text-red-500 w-full text-xs flex gap-1 items-right justify-end">
              <RiErrorWarningLine /> Chat Already Exists
            </p>
          )}
          <div className=" flex justify-end">
            <button
              onClick={() => {
                selected.length == 1
                  ? !ROOM_EXISTS &&
                    newRoom(
                      [...selected, userId],
                      name,
                      userId,
                      setError,
                      (e) => {
                        navigate("/room?roomId=" + e._id);
                        setOpen(false);
                      },
                      rooms,
                      setRooms
                    )
                  : !ROOM_EXISTS &&
                    selected.length > 0 &&
                    name &&
                    newRoom(
                      [...selected, userId],
                      name,
                      userId,
                      setError,
                      (e) => {
                        navigate("/room?roomId=" + e._id);
                        setOpen(false);
                      },
                      rooms,
                      setRooms
                    );
                selected.length > 1 &&
                  !name &&
                  setError("Please Enter Room name");
                !selected.length > 0 && setError("Please Slect Contact");
              }}
              className="flex gap-2 uppercase text-xs font-semibold bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded w-max"
            >
              <TbMessageCircle2 className=" " fontSize={16} /> Start Chatting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
