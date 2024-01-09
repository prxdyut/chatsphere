import React, { useEffect, useLayoutEffect, useState } from "react";
import getPeople from "../helper/getPeople";
import getRooms from "../helper/getRooms";
import { useAuth } from "@clerk/clerk-react";
export const RoomsContext = React.createContext();

export default function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const { userId } = useAuth();

  const reloadRooms = () => getRooms(userId, setRooms);

  useEffect(() => {
    reloadRooms();
  }, [userId]);

  useEffect(() => {
    window.localStorage.setItem(
      "notificationParams",
      JSON.stringify({ userId })
    );
  }, [rooms]);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms, reloadRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}
