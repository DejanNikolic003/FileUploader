import { Router } from "express";
import {
  createFolder,
  deleteFolderById,
  editFolderById,
  showFolderById,
  showFolders,
} from "../controllers/folderController.js";
import { validate } from "../validators/folderValidator.js";

export const folderRouter = Router();

folderRouter.post("/create", validate(), createFolder);
folderRouter.put("/:id", validate(), editFolderById);
folderRouter.delete("/:id", deleteFolderById);
folderRouter.get("/:id", showFolderById);
folderRouter.get("/", showFolders);
