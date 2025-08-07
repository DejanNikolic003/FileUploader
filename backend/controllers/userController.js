import bcrypt, { compare } from "bcrypt";
import { createUser, getUserByName } from "../models/User.js";
import { generateToken, verifyToken } from "../models/Token.js";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await createUser(username, email, hashedPassword);

    const accessToken = generateToken(user.id);
    const refreshToken = generateToken(user.id, "refresh");

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin,
        created_at: user.created_at,
      },
      message: "Successfully registered!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const { username, password } = req.body;

    const user = await getUserByName(username);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Username, or password is incorrect!" });
    }

    const isPasswordMatching = await compare(password, user.password);

    if (!isPasswordMatching) {
      return res
        .status(401)
        .json({ message: "Username, or password is incorrect!" });
    }

    const accessToken = generateToken(user.id);
    const refreshToken = generateToken(user.id, "refresh");

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin,
        created_at: user.created_at,
      },
      message: "Succesfully logged in!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateToken = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error("Invalid or expired token!");

    const user = await verifyToken(token, "refresh").catch((error) => {
      throw new Error(error);
    });

    const accessToken = generateToken(user.id);

    res.status(200).json({
      token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
