import { Router } from "express";
import {
  createFolder,
  deleteFolderById,
  editFolderById,
  showFolderById,
  showFolders,
} from "../controllers/folderController.js";

export const folderRouter = Router();

folderRouter.post("/create", createFolder);
folderRouter.put("/:id", editFolderById);
folderRouter.delete("/:id", deleteFolderById);
folderRouter.get("/:id", showFolderById);
folderRouter.get("/", showFolders);
