import { RequestHandler } from "express";
import User from "../model/user_model";
import { createError } from "../utils/createErros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import { CreateUserDto, UserIdDto } from "../types/user";

//create user
export const createUser: RequestHandler<
  unknown,
  unknown,
  CreateUserDto,
  unknown
> = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const alreadyExits = await User.findOne({ email });
    if (alreadyExits) {
      return next(createError(400, "User already exits"));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

//user login
export const userLogin: RequestHandler<
  unknown,
  unknown,
  CreateUserDto,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, "Please enter email and password"));
    }

    const isUserExit = await User.findOne({ email });
    if (!isUserExit) {
      return next(createError(400, "User not found"));
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserExit.password);
    if (!isPasswordMatch) {
      return next(createError(400, "Invalid credentials"));
    }

    const token = jwt.sign({ id: isUserExit._id }, env.JWT_SECRET, {
      expiresIn: env.JWT_SECRET_EXPIRES_IN,
    });

    if (isUserExit) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = isUserExit.toObject();
      return res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          httpOnly: true,
        })
        .json({ success: true, message: "Login success", user: user, token });
    }
  } catch (error) {
    next(error);
  }
};

//get user by id
export const getUserById: RequestHandler<
  UserIdDto,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getUser = await User.findById(id);
    if (!getUser) {
      return next(createError(404, "User not found"));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = getUser.toObject();
      return res.status(200).json({ success: true, data: rest });
    }
  } catch (error) {
    next(error);
  }
};

//get users
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users) {
      const usersWithoutPassword = users.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user.toObject();
        return rest;
      });
      return res
        .status(200)
        .json({ success: true, data: usersWithoutPassword });
    } else {
      return res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    next(error);
  }
};

//update user
export const updateUser: RequestHandler<
  UserIdDto,
  unknown,
  CreateUserDto,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;

  try {
    const isUser = await User.findById(id);
    if (!isUser) {
      return next(createError(404, "User not found"));
    }
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    const updataUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updataUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = updataUser.toObject();
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

//delete user
export const deleteUser: RequestHandler<
  UserIdDto,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const isUser = await User.findById(id);
    if (!isUser) {
      next(createError(404, "User not found"));
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
