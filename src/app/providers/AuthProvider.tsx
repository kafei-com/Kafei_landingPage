import React, { createContext, useContext, useEffect, useState } from "react";

type User = any | null;

type AuthContextType = {
  user: User;
  token: string | null;
  loading: boolean;
  login: (token: string | null, user?: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper: fetch /users/me to validate token
  const validateToken = async (tkn: string) => {
    try {
      const res = await fetch("/users/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      });

      if (!res.ok) {
        throw new Error("Not authenticated");
      }

      const data = await res.json();
      setUser(data);
      setToken(tkn);
      localStorage.setItem("auth_token", tkn);
      localStorage.setItem("user_data", JSON.stringify(data));
      return true;
    } catch (err) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      return false;
    }
  };

  useEffect(() => {
    // On mount, check for token in localStorage and validate
    const t = localStorage.getItem("auth_token");
    if (!t) {
      setLoading(false);
      return;
    }

    (async () => {
      await validateToken(t);
      setLoading(false);
    })();
  }, []);

  const login = (tkn: string | null, u?: any) => {
    if (u) {
      setUser(u);
      localStorage.setItem("user_data", JSON.stringify(u));
    }

    setToken(tkn);

    if (tkn) {
      localStorage.setItem("auth_token", tkn);
    } else {
      localStorage.removeItem("auth_token");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthProvider;
