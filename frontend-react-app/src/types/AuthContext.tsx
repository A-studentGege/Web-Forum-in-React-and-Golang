import User from "@/types/User";

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

export default AuthContextType;
