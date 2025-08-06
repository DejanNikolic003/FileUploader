import { fetchClient } from "./fetchClient";

export const getFolders = async (token) => {
  if (!token) return;

  return await fetchClient("/folders/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFolderById = async (token, id) => {
  if (!token) return;

  return await fetchClient(`/folders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createFolder = async (token, data) => {
  if (!token) return;

  return await fetchClient("/folders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      folderName: data,
    }),
  });
};

export const deleteFolderById = async (token, id) => {
  if (!token) return;

  return await fetchClient(`/folders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editFolderById = async (token, id, data) => {
  if (!token) return;

  return await fetchClient(`/folders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      folderName: data,
    }),
  });
};
