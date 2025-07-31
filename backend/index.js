import express from "express";
import cors from "cors";
import "dotenv/config";
import { authRouter } from "./routers/authRouter.js";
import cookieParser from "cookie-parser";
import { folderRouter } from "./routers/folderRouter.js";
import { isAuthenticated } from "./middlewares/authMiddleware.js";
import { fileRouter } from "./routers/fileRouter.js";
import fileUpload from "express-fileupload";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use(authRouter);
app.use("/folders", isAuthenticated, folderRouter);
app.use("/files", fileRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
