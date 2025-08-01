import "dotenv/config";
import pkg from "jsonwebtoken";
import { getUserById } from "./User.js";
import { TOKEN_TYPES } from "../utils/TokenTypes.js";
const { sign, verify } = pkg;

export const verifyToken = (token, type = "access") => {
  return new Promise((resolve, reject) => {
    verify(token, TOKEN_TYPES[type].key, async (err, data) => {
      if (err) return reject("Invalid or expired token!");
      if (!data?._id) return reject("Missing ID argument!");

      try {
        const user = await getUserById(data._id);
        if (!user) return reject("User not found!");
        resolve(user);
      } catch (error) {
        reject("Failed to fetch user");
      }
    });
  });
};

export const generateToken = (userId, type = "access") => {
  return sign({ _id: userId }, TOKEN_TYPES[type].key, {
    expiresIn: TOKEN_TYPES[type].expiresIn,
  });
};

export const authenticateToken = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Authorization header is missing.");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new Error("Invalid token!");
  }

  try {
    const user = await verifyToken(token);
    req.user = user;
  } catch (error) {
    return error;
  }
};
