import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { apiLogin, apiGetCurrentUser, apiLogout } from "../api/client";

export interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
  avatar_url?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const userData = await apiGetCurrentUser();
      setUser(userData);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (username: string, password: string) => {
      const data = await apiLogin(username, password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const userData = await apiGetCurrentUser();
      setUser(userData);
    } catch {
      // ignore
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
