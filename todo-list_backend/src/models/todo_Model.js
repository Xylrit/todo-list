import mongoose from "mongoose";
const todoListSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
//create a schema for the database to initialize?

export const Todo = mongoose.model("Todo", todoListSchema);
//create a model from the defined schema and export it
