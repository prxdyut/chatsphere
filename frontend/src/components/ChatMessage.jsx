import { useContext } from "react";
import { ChatContext } from "../contexts/chat";

export function Recieved({ content, created}) {
  const { multipleUsers } = useContext(ChatContext);
  return (
    <div className=" max-w-[60%]  flex gap-2">
      <img
        className=" aspect-square h-6 rounded-full "
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <div className="px-4 flex flex-col pr-6 py-2 gap-2 bg-white w-max rounded-2xl rounded-tl-none">
        {content} <p className=" opacity-75 text-xs">
        {new Date(created).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      </div>
    </div>
  );
}

export function Sent({ content, created }) {
  return (
    <div className="px-4 text-right flex flex-col max-w-[60%] pr-6 py-2 gap-2 self-end bg-gray-200 w-max rounded-2xl  rounded-br-none">
      {content}
      <p className=" opacity-75 text-xs">
        {new Date(created).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
