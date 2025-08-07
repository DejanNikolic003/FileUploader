import "dotenv/config";
import { authenticateToken, verifyToken } from "../models/Token.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    await authenticateToken(req, res);

    if (!req.user) {
      throw new Error("Not logged in!");
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) return res.sendStatus(403);

  const { is_admin } = req.user;

  if (!is_admin) return res.sendStatus(403);

  next();
};
