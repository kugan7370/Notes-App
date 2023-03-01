import env from "../utils/validateEnv";
import mongoose from "mongoose";

export const mongooseConnect = async () => {
  try {
    await mongoose.connect(env.Mongo_Connect);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
