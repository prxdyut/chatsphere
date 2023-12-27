import React from "react";
import logo from "../assets/logo/main.svg";
import { BsPeople } from "react-icons/bs";
import { LuMessagesSquare } from "react-icons/lu";
import { TbMessageCircle2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDevices } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";

const navIconClasses = { fontSize: 24, className: " mx-auto text-white" };
const navOptions = [
  {
    label: "Chats",
    icon: <TbMessageCircle2 {...navIconClasses} />,
    link: `/chats`,
  },
  { label: "People", icon: <BsPeople {...navIconClasses} />, link: `/people` },
  { type: "block" },
  {
    label: "Devices",
    icon: <MdOutlineDevices {...navIconClasses} />,
    link: `/devices`,
  },
  {
    label: "Settings",
    icon: <IoSettingsOutline {...navIconClasses} />,
    link: `/settings`,
  },
];

export default function NavigationBar() {
  const { user, isLoaded } = useUser();
  return (
    <div>
      <div className=" max-lg:hidden flex flex-col bg-black w-20 px-4  h-screen">
        <div className=" flex flex-col h-full gap-4 py-4">
          <img src={logo} className=" aspect-square w-full" />
          {navOptions.map(({ type, icon, link, label }, i) => (
            <React.Fragment key={i}>
              {type == "block" ? (
                <div className=" flex-grow"></div>
              ) : (
                <Link
                  to={link}
                  className=" flex items-center justify-center bg-gray-900 hover:bg-gray-600 aspect-square rounded "
                >
                  <span className="sr-only">{label}</span>
                  <button className=" ">{icon}</button>
                </Link>
              )}
            </React.Fragment>
          ))}
          <Link to="/profile" className=" group  ">
            {isLoaded && (
              <img
                className=" aspect-square h-10 w-10 rounded-full  ring-2 hover:ring-4 hover:ring-white cursor-pointer object-cover"
                src={user.imageUrl}
                alt=""
              />
            )}
          </Link>
        </div>
      </div>
      <div className=" lg:hidden">
        <div className="fixed z-50 max-md:w-screen h-16 w-max -translate-x-1/2 bg-gray-900 border border-gray-200 bottom-0 left-1/2 md:rounded-full md:bottom-4">
          <div className="flex justify-evenly h-full max-w-lg  mx-auto md:gap-4 px-4 py-2">
            {navOptions.map(({ type, icon, link, label }, i) => (
              <React.Fragment key={i}>
                {type == "block" ? (
                  <Link to="/profile" className=" group px-2 ">
                    {isLoaded && (
                      <img
                        className=" aspect-square h-10 w-10 rounded-full  ring-2 hover:ring-4 hover:ring-white cursor-pointer object-cover"
                        src={user.imageUrl}
                        alt=""
                      />
                    )}
                  </Link>
                ) : (
                  <Link
                    to={link}
                    type="button"
                    className=" h-12 w-12 flex items-center rounded-full hover:bg-gray-700 :bg-gray-800 group"
                  >
                    {icon}
                    <span className="sr-only">{label}</span>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
