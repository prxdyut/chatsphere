import React, { useEffect, useState } from "react";
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
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}
