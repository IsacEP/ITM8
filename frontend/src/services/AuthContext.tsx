import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (username: string, password: string): boolean => {
    const envUsers = [
      {
        username: import.meta.env.VITE_USER1,
        password: import.meta.env.VITE_PASS1,
      },
      {
        username: import.meta.env.VITE_USER2,
        password: import.meta.env.VITE_PASS2,
      },
    ];

    const validUser = envUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (validUser) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
