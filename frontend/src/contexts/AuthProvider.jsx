import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { verifyToken } from "../services/userService.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (user && token) return;

    const fetchUser = async () => {
      try {
        const result = await verifyToken();

        setToken(result.token);
        setUser(result.user);
        localStorage.setItem("token", result.token);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
