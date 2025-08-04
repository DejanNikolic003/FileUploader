import * as userAPI from "../api/userApi";

export const register = async (formData) => {
  const user = await userAPI.register(formData);

  return user;
};

export const login = async (formData) => {
  const user = await userAPI.login(formData);

  return user;
};
