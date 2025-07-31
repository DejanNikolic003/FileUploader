import { prisma } from "../prisma/prisma.js";

export const create = async (name, userId) => {
  const folder = await prisma.folder.create({
    data: {
      name,
      user_id: userId,
    },
  });
  return folder;
};

export const getAllFolders = async () => {
  const folders = await prisma.folder.findMany();

  return folders;
};

export const getFolderById = async (id) => {
  const folder = await prisma.folder.findFirst({
    where: {
      id: id,
    },
  });

  return folder;
};

export const getFolderByUserId = async (userId) => {
  const folders = await prisma.folder.findMany({
    where: {
      user_id: userId,
    },
  });

  return folders;
};

export const deleteFolderById = async (id) => {
  return await prisma.folder.delete({
    where: {
      id,
    },
  });
};

export const editFolderById = async (id, name) => {
  const folder = await prisma.folder.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  return folder;
};
