import { fetchClient } from "./fetchClient";

export const getFiles = async (token, id) => {
  return await fetchClient(`/files/folders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFile = async (token, data) => {
  return await fetchClient(
    `/files/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    },
    null,
  );
};

export const downloadFile = async (token, id) => {
  return await fetchClient(
    `/files/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    null,
    "blob",
  );
};
