"use client";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedin, setLoggedin] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedin, setLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
