import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { API_URL } from "../utils/config.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (user && token) return;

    if (location.pathname === "/register" || location.pathname === "/login")
      return;

    const fetchUser = async () => {
      try {
        const request = await fetch(`${API_URL}/token`, {
          method: "POST",
          credentials: "include",
        });

        const response = await request.json();

        setToken(response.token);
        setUser(response.user);

        localStorage.setItem("token", response.token);
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
