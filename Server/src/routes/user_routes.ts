import Express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  userLogin,
} from "../controllers/user_controller";

const router = Express.Router();

//create user
router.post("/create", createUser);

//login user
router.post("/login", userLogin);

//get user by id
router.get("/getUser/:id", getUserById);

//get users
router.get("/getUsers", getUsers);

//update user
router.put("/update/:id", updateUser);

//delete user
router.delete("/delete/:id", deleteUser);

export default router;
