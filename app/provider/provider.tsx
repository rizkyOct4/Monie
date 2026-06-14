"use client";

import { ReactNode } from "react";
import { UserContext } from "../context/context";
import { useSessionClient } from "@/_lib/c-session";

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const { publicId } = useSessionClient();

  //   const project = useProject({ publicId });

  //   const values = {
  //     ...project,
  //   };

  return (
    <UserContext.Provider value={publicId}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
