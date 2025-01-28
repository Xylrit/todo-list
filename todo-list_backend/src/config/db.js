import mongoose from "mongoose";
import { mongoURI } from "./env.js";
//import mongoose library

export const dbConnect = async () => {
  await mongoose.connect(mongoURI);
};
//export the function to connect to the database
