import { Schema, model, Document } from "mongoose";

export interface NoteDocument extends Document {
  title: string;
  text?: string;
  createdAt: Date;
  updatedAt: Date;
}

const notesSchema = new Schema<NoteDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Note = model<NoteDocument>("Note", notesSchema);

export default Note;
