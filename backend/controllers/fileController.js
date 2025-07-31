import * as model from "../models/File.js";
import { getFolderById } from "../models/Folder.js";
import path from "path";
import fs from "fs/promises";

export const createFile = async (req, res) => {
  try {
    const { folderId } = req.body;
    const folder = await getFolderById(Number(folderId));

    if (!folder || folder.user_id !== req.user.id) {
      const filePath = path.join("uploads", req.files[0].filename);
      await fs.unlink(filePath);
      throw Error("Folder doesn't exists or you dont have access!");
    }

    const file = await model.create(
      req.files[0].filename,
      "",
      1,
      Number(folderId)
    );

    res.status(200).json({ message: "Successfully uploaded!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showFilesByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const files = await model.getAllFilesByUserId(Number(id));

    res.status(200).json({ files, message: "Successfully fetched! " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showFilesByFolderId = async (req, res) => {
  try {
    const { id } = req.params;
    const files = await model.getAllFilesByFolderId(Number(id));

    res.status(200).json({ files, message: "Successfully fetched! " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFileById = async (req, res) => {
  try {
    const { id, is_admin } = req.user;
    const fileId = Number(req.params.id);
    const file = await model.getFileById(fileId);

    if (file.user_id !== id && !is_admin) {
      return res
        .status(403)
        .json({ message: "You don't have access to delete this! " });
    }

    await model.deleteFileById(fileId);

    res.status(200).json({ message: "File successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
