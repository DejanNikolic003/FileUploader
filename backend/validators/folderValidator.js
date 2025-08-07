import { body } from "express-validator";

export const validate = () => {
  return body("folderName", "Folder name doesn't exists").exists();
};
