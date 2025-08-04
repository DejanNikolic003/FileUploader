import { registerUser, loginUser } from "../api/userApi";

export const register = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await registerUser(formData);

    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await loginUser(formData);

    return user;
  } catch (error) {
    throw error;
  }
};
