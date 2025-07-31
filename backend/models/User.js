import { prisma } from "../prisma/prisma.js";

export const createUser = async (username, email, hashedPassword) => {
  const userExists = await checkIfUserExists(username);

  if (userExists) throw new Error("User already exists with this username!");

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const getUserById = async (userId) => {
  return await prisma.user.findFirst({ where: { id: userId } });
};

export const getUserByName = async (username) => {
  return await prisma.user.findFirst({ where: { username } });
};

const checkIfUserExists = async (username) => {
  const user = await prisma.user.findFirst({ where: { username } });
  return !!user;
};
