import { Router } from "express";
import {
  createFile,
  deleteFileById,
  downloadFile,
  showFilesByFolderId,
  showFilesByUserId,
} from "../controllers/fileController.js";
import multer from "multer";
import path from "path";

export const fileRouter = Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.originalName = file.originalname;

    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
});

fileRouter.post("/upload", upload.array("file", 10), createFile);
fileRouter.get("/folders/:id", showFilesByFolderId);
fileRouter.delete("/:id", deleteFileById);
fileRouter.get("/:id", downloadFile);
fileRouter.get("/", showFilesByUserId);
