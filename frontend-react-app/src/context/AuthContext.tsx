import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { userLogin, fetchMe } from "@/services/authService";
import { decodeToken } from "@/utils/decodeToken";

import User from "@/types/User";
import AuthContextType from "@/types/AuthContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  // Logic to persist login on page refresh
  // checks if a token exists, validates it, and sync with react state
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      return;
    }

    const initAuth = async () => {
      try {
        await validateToken(savedToken);
        applyToken(savedToken);
      } catch (err) {
        if (err instanceof Error && err.message === "SESSION_EXPIRED") {
          alert("Your session has expired, please log in again.");
          logout();
        } else {
          alert("Server error, please try again later.");
        }
      }
    };

    initAuth();
  }, []);

  // login func to communicate with backend
  const login = async (username: string) => {
    try {
      const data = await userLogin({ username: username });

      // save token to local storage
      localStorage.setItem("token", data.token);

      await validateToken(data.token);
      applyToken(data.token);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      alert("Some error occurred, please try again.");
      alert(error);
    }
  };

  // validate the token with backend
  const validateToken = async (token: string) => {
    await fetchMe(token);
  };

  // decode the token and set state with its claims
  const applyToken = (token: string) => {
    const decoded = decodeToken(token);

    setToken(token);
    setUser({
      id: decoded.id,
      username: decoded.username,
      is_admin: decoded.is_admin,
    });
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
