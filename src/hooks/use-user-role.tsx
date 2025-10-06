"use client";

import type { Role } from "@/lib/types";
import { createContext, useContext, useState, useMemo } from "react";

type UserRoleContextType = {
  role: Role;
  setRole: (role: Role) => void;
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("student");

  const value = useMemo(() => ({ role, setRole }), [role]);

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
}
