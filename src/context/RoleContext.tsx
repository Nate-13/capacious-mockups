"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type RoleType =
  | "Author"
  | "Managing Editor"
  | "Reviewer"
  | "Copy Editor"
  | "Admin";

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [role, setRole] = useState<RoleType>("Author");

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
