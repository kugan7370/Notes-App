//create routes
import Express from "express";
import {
  createNotes,
  deleteNote,
  getNotes,
  updateNotes,
} from "../controllers/notes_controllers";

const router = Express.Router();

//create notes
router.post("/create", createNotes);

//get notes
router.get("/getNotes", getNotes);

//update notes
router.put("/update/:id", updateNotes);

//delete notes
router.delete("/delete/:id", deleteNote);

export default router;
