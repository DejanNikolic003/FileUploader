import { fetchClient } from "./fetchClient";

export const registerUser = async (data) => {
  return await fetchClient("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data) => {
  return await fetchClient("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
