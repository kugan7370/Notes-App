//create notes
import { RequestHandler } from "express";
import mongoose from "mongoose";
import Note from "../model/notes_model";
import { createError } from "../utils/createErros";

interface createDto {
  title: string;
  text?: string;
}

//create notes
export const createNotes: RequestHandler<
  unknown,
  unknown,
  createDto,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const note = new Note({ title, text });
    const savedNote = await note.save();

    return res
      .status(201)
      .json({ success: true, message: "Note created", savedNote });
  } catch (error) {
    next(error);
  }
};

//get notes
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    next(error);
  }
};

interface updateDto {
  title?: string;
  text?: string;
}
interface updateParams {
  id: string;
}

//update notes
export const updateNotes: RequestHandler<
  updateParams,
  unknown,
  updateDto,
  unknown
> = async (req, res, next) => {
  const id = req.params.id;
  try {
    const checkNote = await Note.findById(id);
    if (!checkNote) {
      next(createError(404, "Note not found"));
    }
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Note updated",
      updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

//deleteNotes

export const deleteNote: RequestHandler<
  updateParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkNote = await Note.findById(id);
    if (!checkNote) {
      next(createError(404, "Note not found"));
    }
    const delete_note = await Note.findByIdAndDelete(id);
    return res.status(201).json({ success: true, message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};
