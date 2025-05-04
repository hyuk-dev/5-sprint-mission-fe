"use client";

import { User } from "@/core/types/User";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children, initialUser }: { children: ReactNode, initialUser: User }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider를 찾을 수 없습니다.");
  return context;
}