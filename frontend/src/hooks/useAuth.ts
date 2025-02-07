import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is authenticated (e.g., based on token or session)
    setIsAuthenticated(localStorage.getItem("authToken") !== null);
  }, []);

  return isAuthenticated;
};
