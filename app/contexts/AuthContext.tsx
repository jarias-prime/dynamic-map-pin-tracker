"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static credentials
const VALID_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (email: string, password: string): boolean => {
    if (
      email === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password
    ) {
      setIsLoggedIn(true);
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
