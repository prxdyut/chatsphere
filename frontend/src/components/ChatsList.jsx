import { useContext, useEffect, useState } from "react";
import Divider from "./Divider";
import { Link } from "react-router-dom";
import { ChatContext } from "../contexts/chat";
import { RoomsContext } from "../contexts/rooms";
import { useAuth } from "@clerk/clerk-react";
import getUsers from "../helper/getUsers";
import { UsersContext } from "../contexts/users";

export default function ChatsList({}) {
  const {room } = useContext(ChatContext)
  const { rooms } = useContext(RoomsContext);
  const { users: allUsers } = useContext(UsersContext);
  const { userId } = useAuth();

  function ChatSingle({ users, _id : id }) {
    const [currentUsers, setCurrentUsers] = useState([]);
    useEffect(() => {
      getUsers(users, userId, setCurrentUsers, allUsers);
    }, []);

    return (
      <div className={`" cursor-pointer block p-4 rounded  w-full hover:bg-gray-100 ${room == id && 'bg-gray-200'}  "`}>
        <div className=" flex align-middle">
          <img
            className=" aspect-square h-10 w-10 rounded-full  object-cover"
            src={currentUsers[0]?.imageUrl}
            alt=""
          />
          <div className=" pl-4 flex-grow gap-1 flex flex-col">
            <div className=" flex  items-center">
              <p className=" font-semibold flex-grow text-start">
                {currentUsers[0]?.firstName + " " + currentUsers[0]?.lastName}
              </p>
              <p className=" text-xs opacity-75">11: 111 PM</p>
            </div>
            <p className="  text-sm text-start">Recent Message</p>
          </div>
        </div>
      </div>
    );
  }

  function ChatMultiple({ users, name, _id: id }) {
    const [currentUsers, setCurrentUsers] = useState([]);
    console.log(currentUsers);
    useEffect(() => {
      getUsers(users, userId, setCurrentUsers, allUsers);
    }, []);

    return (
      <div className={`" cursor-pointer rounded block p-4  w-full hover:bg-gray-100 ${room == id && 'bg-gray-200'}  "`}>
        <div className="flex flex-col align-middle gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            {currentUsers.map(({ imageUrl }) => (
              <img
                className=" aspect-square h-10 w-10 rounded-full  object-cover"
                src={imageUrl}
                alt=""
              />
            ))}
          </div>
          <div className=" flex-grow gap-1 flex flex-col">
            <div className=" flex  items-center">
              <p className=" font-semibold flex-grow text-start">
                {name || "Untitled"}
              </p>
              <p className=" text-xs opacity-75">11: 111 PM</p>
            </div>
            <p className="  text-sm text-start">Recent Message</p>
          </div>
        </div>
      </div>
    );
  }
  const single = rooms.filter(({ users }) => users.length == 2);
  const multiple = rooms.filter(({ users }) => users.length > 2);

  return (
    <div className=" overflow-y-auto">
      {single.map((chat) => (
        <Link to={"/room?roomId=" + chat._id}>
          <ChatSingle {...chat} />
        </Link>
      ))}
      <Divider title={"Groups"} position={"left"} />
      {multiple.map((chat) => (
        <Link to={"/room?roomId=" + chat._id}>
          <ChatMultiple {...chat} />
        </Link>
      ))}
    </div>
  );
}
