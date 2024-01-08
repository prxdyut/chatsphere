import { useContext } from "react";
import { ChatContext } from "../contexts/chat";
import { UsersContext } from "../contexts/users";

export function Recieved({ content, created, sent, userId, showInfo }) {
  const { findUser } = useContext(UsersContext);
  const { multipleUsers } = useContext(ChatContext);
  const user = findUser(userId);
  return (
    <div className=" max-w-[60%]  flex gap-2">
      {multipleUsers && (
        <img
          className={`" aspect-square h-6 rounded-full object-cover ${
            !showInfo && "opacity-0"
          } "`}
          src={user?.imageUrl}
          alt=""
        />
      )}
      <div className="px-4 flex flex-col pr-6 py-2 gap-2 bg-white w-max rounded-2xl rounded-tl-none">
        {multipleUsers && showInfo && (
          <p className=" text-xs font-bold opacity-75">
            {user.firstName + " " + user.lastName}
          </p>
        )}
        {content}
        <p className=" opacity-50 text-xs">
          {sent &&
            new Date(created).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </p>
      </div>
    </div>
  );
}

export function Sent({ content, created, sent, showInfo }) {
  return (
    <div className="px-4 text-right flex flex-col max-w-[60%] pr-6 py-2 gap-2 self-end bg-gray-200 w-max rounded-2xl  rounded-br-none">
      {content}

      <p className=" opacity-50 text-xs">
        {(sent || showInfo) &&
          new Date(created).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
      </p>
    </div>
  );
}
