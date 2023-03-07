//create routes
import Express from "express";
import {
  createNotes,
  deleteNote,
  getNotes,
  getUserNotes,
  updateNotes,
} from "../controllers/notes_controllers";
import { varifyUser, varifyUserCookie } from "../middleware/varifyUser";

const router = Express.Router();

//create notes
router.post("/create", varifyUserCookie, createNotes);

//get notes
router.get("/getNotes", getNotes);

//get notes by id
router.get("/getUserNotes", varifyUserCookie, getUserNotes);

//update notes
router.put("/update/:id", varifyUserCookie, updateNotes);

//delete notes
router.delete("/delete/:id", varifyUserCookie, deleteNote);

export default router;
