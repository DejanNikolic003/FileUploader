import { createUser } from "../api/userApi";

export const registerUser = async (formData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await createUser(formData);

    return user;
  } catch (error) {
    throw error;
  }
};
