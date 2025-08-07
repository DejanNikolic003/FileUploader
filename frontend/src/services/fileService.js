import * as fileApi from "../api/fileApi";

export const getFiles = async (token, id) => {
  const { files } = await fileApi.getFiles(token, id);

  return files;
};

export const uploadFile = async (token, data) => {
  const result = await fileApi.uploadFile(token, data);

  return result;
};

export const downloadFile = async (token, id) => {
  const result = await fileApi.downloadFile(token, id);

  return result;
};
