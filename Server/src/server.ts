import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import env from "./utils/validateEnv";
import { mongooseConnect } from "./db/db";
import cookieParser from "cookie-parser";
const app = express();

import notesRoutes from "./routes/notes_routes";
import userRoutes from "./routes/user_routes";
import { ErrorStatus } from "./utils/createErros";
import handleValidationError from "./utils/validationError";

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);

//mongoose error handler
app.use(handleValidationError);

//error handler
app.use((err: ErrorStatus, req: Request, res: Response, next: NextFunction) => {
  const status = err?.status ?? 500;
  const message = err?.message ?? "Something went wrong";
  return res.status(status).send({
    message,
    status,
    success: false,
  });
});

//server
app.listen(env.PORT, () => {
  mongooseConnect();
  console.log("Server is running on port 5000");
});
