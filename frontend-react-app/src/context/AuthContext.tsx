import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import User from "../types/User";
import AuthContextType from "../types/AuthContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Logic to persist login on page refresh
  // checks if a token exists and sync with react state
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // fetch user profile here using the token
      setToken(savedToken);
    }
  }, []);

  // login func to communicate with backend
  const login = async (username: string) => {
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // save token to local storage

        setToken(data.token);
        setUser({ id: data.id, username: data.username }); // set current user info
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  // when logout, remove token and reset user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
    // children: every component inside here has access to auth data
  );
};

// custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  // error check for using auth data in part of app that's not wrapped by auth provider
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
