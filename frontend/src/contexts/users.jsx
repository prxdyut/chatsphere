import React, { useEffect, useState } from "react";
export const UsersContext = React.createContext();

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const loadUsers = () =>
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then(({ data }) => setUsers(data));

  useEffect(() => {
    loadUsers();
  }, []);
  

  return (
    <UsersContext.Provider value={{ users, reloadUsers: loadUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
