import { useState } from "react";
import ChatProvider from "../contexts/chat";
import AuthProvider from "../contexts/auth";
import PeopleContext from "../contexts/people";
import RoomsProvider from "../contexts/rooms";
import UsersProvider from "../contexts/users";

export default function ContextProvider({ children }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <PeopleContext>
          <RoomsProvider>
            <ChatProvider>{children}</ChatProvider>
          </RoomsProvider>
        </PeopleContext>
      </UsersProvider>
    </AuthProvider>
  );
}
