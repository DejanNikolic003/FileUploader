import * as folderAPI from "../api/folderApi";

export const getFolders = async (token) => {
  const { folders } = await folderAPI.getFolders(token);

  return folders;
};

export const createFolder = async (token, data) => {
  const result = await folderAPI.createFolder(token, data);

  return result;
};

export const deleteFolderById = async (token, id) => {
  const result = await folderAPI.deleteFolderById(token, id);

  return result;
};

export const editFolderById = async (token, id, data) => {
  const result = await folderAPI.editFolderById(token, id, data);

  return result;
};
