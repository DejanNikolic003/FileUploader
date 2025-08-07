import { Router } from "express";
import { login, register, updateToken } from "../controllers/userController.js";
import { validate } from "../validators/userValidator.js";
export const authRouter = Router();

authRouter.post("/register", validate("createUser"), register);
authRouter.post("/login", validate("loginUser"), login);
authRouter.post("/token", updateToken);
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expiresIn: Date.now() });
  res.status(200).json({ message: "Cookie deleted!" });
});
