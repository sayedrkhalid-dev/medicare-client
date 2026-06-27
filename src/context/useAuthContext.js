"use client";

import { useContext } from "react";

import AuthContext from "./AuthContext";

/**
 * Authentication Context Hook
 */
const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};

export default useAuthContext;
