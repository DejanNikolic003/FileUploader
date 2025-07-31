import * as model from "../models/Folder.js";

export const createFolder = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length !== 1)
      throw new Error("Invalid body type");

    if (!req.body.folderName || typeof req.body.folderName !== "string")
      throw new Error("Folder name field required, and must be a string!");

    const { folderName } = req.body;

    const folder = await model.create(folderName, 1);

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
    const { id } = req.params;
    const folder = await model.getFolderById(Number(id));

    if (!folder) return;

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

    await model.deleteFolderById(folderId);

    res.status(200).json({ message: "Folder successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editFolderById = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length !== 1)
      throw new Error("Invalid body type");

    if (!req.body.folderName || typeof req.body.folderName !== "string")
      throw new Error("Folder name field required, and must be a string!");

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
