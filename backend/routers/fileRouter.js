import { Router } from "express";
import { createFile } from "../controllers/fileController.js";
export const fileRouter = Router();

fileRouter.post("/upload", createFile);
