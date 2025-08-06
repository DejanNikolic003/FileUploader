import * as folderAPI from "../api/folderApi";

//   const response = await fetch(`${API_URL}/folders/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       navigate("/folders");
//       return;
//     }

//     setFolder(result.folder);

export const getFolders = async (token) => {
  const { folders } = await folderAPI.getFolders(token);

  return folders;
};

export const getFolderById = async (token, id) => {
  const result = await folderAPI.getFolderById(token, id);

  return result;
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
