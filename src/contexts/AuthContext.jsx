import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user
  const [loading, setLoading] = useState(true); // Initial loading state
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
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
  }, [token]);

  const login = async (username, password) => {
    const { access, refresh } = await authService.login(username, password);
    localStorage.setItem("authToken", access);
    localStorage.setItem("refreshToken", refresh);
    setToken(access);       // triggers the above effect (with delay)
  };

  const logout = () => {
    authService.logout(); // Clears localStorage
    setUser(null); // Clears user from state
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
