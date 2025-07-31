import { prisma } from "../prisma/prisma.js";

export const create = async (name, link, userId, folderId = null) => {
  const file = await prisma.file.create({
    data: {
      name,
      link,
      user_id: userId,
      folder_id: folderId,
    },
  });

  return file;
};

export const deleteFileById = async (id) => {
  return await prisma.file.delete({
    where: {
      id,
    },
  });
};

export const getAllFilesByUserId = async (userId) => {
  const files = await prisma.file.findMany({
    where: {
      user_id: userId,
    },
  });

  return files;
};

export const getAllFilesByFolderId = async (folderId) => {
  const files = await prisma.file.findMany({
    where: {
      folder_id: folderId,
    },
  });

  return files;
};

export const getFileById = async (id) => {
  return await prisma.file.findFirst({
    where: {
      id,
    },
  });
};
