import React, { useEffect, useState } from "react";
import { apiUrl } from "../helper/apiUrl";
export const UsersContext = React.createContext();

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const loadUsers = () =>
    fetch(apiUrl + "/users")
      .then((res) => res.json())
      .then(({ data }) => setUsers(data));

  useEffect(() => {
    loadUsers();
  }, []);

  const findUser = (id) => users?.find((user) => id == user.id);
  return (
    <UsersContext.Provider value={{ users, reloadUsers: loadUsers, findUser }}>
      {children}
    </UsersContext.Provider>
  );
}
