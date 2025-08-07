import { validationResult } from "express-validator";
import * as model from "../models/Folder.js";
import { deleteAllFilesByFolderId } from "./fileController.js";

export const createFolder = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { id } = req.user;
    const { folderName } = req.body;

    const folder = await model.create(folderName, Number(id));

    res.status(200).json({ folder, message: "Successfully created!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showFolders = async (req, res) => {
  try {
    const { id, is_admin } = req.user;
    const folders = is_admin
      ? await model.getAllFolders()
      : await model.getFolderByUserId(id);

    res.status(200).json({ folders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showFolderById = async (req, res) => {
  try {
    const { id, is_admin } = req.user;
    const folderId = req.params.id;
    const folder = await model.getFolderById(Number(folderId));

    if (!folder) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    if (folder.user_id !== id && !is_admin) {
      return res
        .status(403)
        .json({ message: "You don't have access to view this! " });
    }

    res.status(200).json({ folder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFolderById = async (req, res) => {
  try {
    const { id, is_admin } = req.user;
    const folderId = Number(req.params.id);

    const folder = await model.getFolderById(folderId);

    if (!folder) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    if (folder.user_id !== id && !is_admin) {
      return res
        .status(403)
        .json({ message: "You don't have access to delete this! " });
    }

    await deleteAllFilesByFolderId(folderId);
    await model.deleteFolderById(folderId);

    res.status(200).json({ message: "Folder successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editFolderById = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { folderName } = req.body;
    const { id, is_admin } = req.user;
    const folderId = Number(req.params.id);

    const folder = await model.getFolderById(folderId);

    if (!folder) {
      return res.status(404).json({ message: "Folder not found!" });
    }

    if (folder.user_id !== id && !is_admin) {
      return res
        .status(403)
        .json({ message: "You don't have access to modify this! " });
    }

    const editedFolder = await model.editFolderById(folderId, folderName);

    res
      .status(200)
      .json({ folder: editedFolder, message: "Folder successfully edited!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
