import { body } from "express-validator";

export const validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("username", "Username doesn't exists").exists(),
        body("email", "Email doesn't exists").exists(),
        body("password", "Password doesn't exists").exists(),
      ];
    }
    case "loginUser": {
      return [
        body("username", "Username doesn't exists").exists(),
        body("password", "Password doesn't exists").exists(),
      ];
    }
  }
};
