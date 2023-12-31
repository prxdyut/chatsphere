import { useContext, useEffect, useState } from "react";
import Divider from "./Divider";
import { Link } from "react-router-dom";
import { ChatContext } from "../contexts/chat";
import { RoomsContext } from "../contexts/rooms";
import { useAuth } from "@clerk/clerk-react";
import getUsers from "../helper/getUsers";
import { UsersContext } from "../contexts/users";
import { PeopleContext } from "../contexts/people";

export default function ChatsList({}) {
  const { room, recents } = useContext(ChatContext);
  const { rooms } = useContext(RoomsContext);
  const { users: allUsers, findUser } = useContext(UsersContext);
  const { userId } = useAuth();
  
  function ChatSingle({ users, _id: id }) {
    const [currentUsers, setCurrentUsers] = useState([]);
    useEffect(() => {
      getUsers(users, userId, setCurrentUsers, allUsers);
    }, []);

    return (
      <div
        className={`" cursor-pointer block p-4 rounded  w-full hover:bg-gray-100 ${
          room == id && "bg-gray-200"
        }  "`}
      >
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

            {recents[id]?.by && (
              <p className="  text-sm text-start">
                <b>{userId == recents[id]?.by ? (
                  "You : "
                ) : (
                  `${findUser(recents[id]?.by)?.firstName || ""} ${
                    findUser(recents[id]?.by)?.lastName || ""
                  } : `
                )}</b>
                {recents[id]?.message || ""}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  function ChatMultiple({ users, name, _id: id }) {
    const [currentUsers, setCurrentUsers] = useState([]);
    useEffect(() => {
      getUsers(users, userId, setCurrentUsers, allUsers);
    }, []);

    return (
      <div
        className={`" cursor-pointer rounded block p-4  w-full hover:bg-gray-100 ${
          room == id && "bg-gray-200"
        }  "`}
      >
        <div className="flex flex-col align-middle gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            {currentUsers.map(({ imageUrl }, i) => (
              <img
                key={i}
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
            </div>
            {recents[id]?.by && (
              <p className="  text-sm text-start">
                <b>{userId == recents[id]?.by ? (
                  "You : "
                ) : (
                  `${findUser(recents[id]?.by)?.firstName || ""} ${
                    findUser(recents[id]?.by)?.lastName || ""
                  } : `
                )}</b>
                {recents[id]?.message || ""}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const single = rooms.filter(({ users }) => users.length == 2);
  const multiple = rooms.filter(({ users }) => users.length > 2);

  return (
    <div className=" overflow-y-auto">
      {single.map((chat, i) => (
        <Link to={"/room?roomId=" + chat._id} key={i}>
          <ChatSingle {...chat} />
        </Link>
      ))}
      <Divider title={"Groups"} position={"left"} />
      {multiple.map((chat, i) => (
        <Link to={"/room?roomId=" + chat._id} key={i}>
          <ChatMultiple {...chat} />
        </Link>
      ))}
    </div>
  );
}
