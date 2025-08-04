import { fetchClient } from "./fetchClient";

export const register = async (data) => {
  return await fetchClient("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = async (data) => {
  return await fetchClient("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
