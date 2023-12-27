"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { AuthContextProps } from "@/types";
import { AuthProviderProps } from "@/types";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedin, setLoggedin] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedin, setLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
