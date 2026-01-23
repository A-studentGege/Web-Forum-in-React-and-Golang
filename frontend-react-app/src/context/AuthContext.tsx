import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { userLogin, fetchMe } from "@/services/authService";
import { decodeToken } from "@/utils/decodeToken";

import User from "@/types/User";
import AuthContextType from "@/types/AuthContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider supplies authentication state and actions to the application.
 * should only be accessed via useAuth hook
 *
 * Responsibilities:
 * - Stores authenticated user and JWT token in React state
 * - Persists login across page refresh using localStorage
 * - Validates existing tokens with the backend on app load
 * - Decodes JWT claims and synchronizes user state
 * - Provides login and logout functionality
 *
 *  Wrap this provider around components that require authentication access.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Child components that need access to auth context
 * @returns {JSX.Element} Auth context provider component
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  // decode the token and set state with its claims
  const applyToken = useCallback((token: string) => {
    try {
      const decoded = decodeToken(token);

      setToken(token);
      setUser({
        id: decoded.id,
        username: decoded.username,
        is_admin: decoded.is_admin,
      });
    } catch {
      logout();
    }
  }, []);

  const initAuth = useCallback(
    async (token: string) => {
      try {
        await validateToken(token);
        applyToken(token);
      } catch (err) {
        if (err instanceof Error && err.message === "SESSION_EXPIRED") {
          alert("Your session has expired, please log in again.");
          logout();
        } else {
          alert("Server error, please try again later.");
        }
      }
    },
    [applyToken],
  );

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
    }
  };

  // validate the token with backend
  const validateToken = async (token: string) => {
    await fetchMe(token);
  };

  // when logout, remove token and reset user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Logic to persist login on page refresh
  // checks if a token exists, validates it, and sync with react state
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      return;
    }

    initAuth(savedToken);
  }, [initAuth]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
    // children: every component inside here has access to auth data
  );
};

/**
 * useAuth is a custom hook for accessing authentication context.
 *
 * Provides:
 * - Authenticated user information
 * - JWT token
 * - Authentication state (isAuthenticated)
 * - Login and logout functions
 *
 * Must be used within an AuthProvider. Throws an error otherwise.
 *
 * @throws {Error} If used outside of AuthProvider
 * @returns {AuthContextType} Authentication context values and actions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  // error check for using auth data in part of app that's not wrapped by auth provider
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
