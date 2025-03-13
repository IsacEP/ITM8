import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("authToken") !== null);
  }, []);

  return isAuthenticated;
};
