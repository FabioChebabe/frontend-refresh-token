import React, { createContext } from "react";

interface IAuthContextValue {
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value: IAuthContextValue = {
    isAuthenticated: false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
