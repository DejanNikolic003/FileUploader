import * as model from "../models/File.js";

export const createFile = (req, res) => {
  try {
    console.log(req.files);
    res.status(200).json({ message: "Successfully uploaded!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
