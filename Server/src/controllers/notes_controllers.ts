//create notes
import { RequestHandler } from "express";
import Note, { NoteDocument } from "../model/notes_model";
import User from "../model/user_model";
import { createDto, userResponcesDto } from "../types/notes";
import { createError } from "../utils/createErros";

//create notes
export const createNotes: RequestHandler<
  unknown,
  unknown,
  createDto,
  unknown
> = async (req, res, next) => {
  const { title, text, userId } = req.body;
  try {
    const note = new Note({ title, text, userId });
    const savedNote = await note.save();

    return res
      .status(201)
      .json({ success: true, message: "Note created", savedNote });
  } catch (error) {
    next(error);
  }
};

export interface NoteWithUsername extends NoteDocument {
  name?: string;
}

//get notes
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    //get all notes
    const notes = await Note.find().sort({ createdAt: -1 });
    if (!notes) {
      next(createError(404, "Notes not found"));
    }
    //map through notes and get username
    const notesWithUser = await Promise.all(
      notes.map(async (note) => {
        const userDetails: userResponcesDto | null = await User.findById(
          note.userId
        );
        if (!userDetails) {
          next(createError(404, "User not found"));
        }
        const noteWithUsername: NoteWithUsername = note.toObject();
        noteWithUsername.name = userDetails?.name;
        return noteWithUsername;
      })
    );
    return res.status(200).json({ success: true, data: notesWithUser });
  } catch (error) {
    next(error);
  }
};
//get notes by id
export const getUserNotes: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const note = await Note.find({ userId }).sort({ createdAt: -1 });
    if (!note) {
      next(createError(404, "Note not found"));
    }
    return res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

//update notes
export const updateNotes: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  try {
    const checkNote = await Note.findOne({ _id: id, userId: req.body.userId });
    if (!checkNote) {
      return next(createError(403, "Forbidden access to this note"));
    }
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

//deleteNotes

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkNote = await Note.findOne({ _id: id, userId: req.body.userId });
    if (!checkNote) {
      return next(createError(403, "Forbidden access to this note"));
    }
    await Note.findByIdAndDelete(id);

    return res
      .status(201)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
