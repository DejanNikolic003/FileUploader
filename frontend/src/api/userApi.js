import { fetchClient } from "./fetchClient";

export const createUser = async (data) => {
  return await fetchClient("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
