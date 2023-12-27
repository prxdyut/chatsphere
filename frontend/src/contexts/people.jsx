import React, { useContext, useEffect, useState } from "react";
import getPeople from "../helper/getPeople";
import { UsersContext } from "./users";
export const PeopleContext = React.createContext();

export default function PeopleProvider({ children }) {
  const { users } = useContext(UsersContext);
  const [people, setPeople] = useState([]);
  const reloadPeople = () => getPeople(setPeople, users);
  useEffect(() => {
    reloadPeople();
  }, [users]);

  return (
    <PeopleContext.Provider value={{ people, setPeople, reloadPeople }}>
      {children}
    </PeopleContext.Provider>
  );
}
