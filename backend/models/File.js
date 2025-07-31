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
