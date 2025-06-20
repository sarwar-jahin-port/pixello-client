import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        console.log("API returned user data:", userData); // Add this line
        console.log("User data type:", typeof userData); // Add this line
        console.log("User data keys:", Object.keys(userData || {})); // Add this line
        setUser(userData);
      } catch (error) {
        console.error("Error fetching current user:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    authService.logout(); // Clears localStorage
    setUser(null); // Clears user from state
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
