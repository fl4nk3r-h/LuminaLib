"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export type UserRole = "ROLE_ADMIN" | "ROLE_USER";

interface AuthUser {
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") as UserRole | null;
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedRole && storedUsername) {
      setToken(storedToken);
      setUser({ username: storedUsername, role: storedRole });
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await api.post("/auth/login", { username, password });
    const { token: jwt, role, username: returnedUsername } = response.data;

    localStorage.setItem("token", jwt);
    localStorage.setItem("role", role);
    localStorage.setItem("username", returnedUsername || username);

    setToken(jwt);
    setUser({ username: returnedUsername || username, role });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === "ROLE_ADMIN";

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isAdmin, login, logout, loading }}
    >
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
