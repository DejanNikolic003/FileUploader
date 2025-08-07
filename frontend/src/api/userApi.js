import { fetchClient } from "./fetchClient";

export const register = async (data) => {
  return await fetchClient("/register", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const login = async (data) => {
  return await fetchClient("/login", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const logout = async () => {
  return await fetchClient("/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const verifyToken = async () => {
  return await fetchClient(`/token`, {
    method: "POST",
    credentials: "include",
  });
};
