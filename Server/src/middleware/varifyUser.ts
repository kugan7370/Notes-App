import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createError } from "../utils/createErros";
import env from "../utils/validateEnv";

//varify user using authorization token
export const varifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next(createError(401, "Unauthorized"));
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.body.userId = decoded.id;
    console.log(decoded);

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(createError(401, "Invalid token"));
    } else {
      next(error);
    }
  }
};

// varify user using cookie
export const varifyUserCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.access_token) {
    return next(createError(401, "Unauthorized"));
  }

  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(createError(401, "Invalid token"));
    } else {
      next(error);
    }
  }
};
