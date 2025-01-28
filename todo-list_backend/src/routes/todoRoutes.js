import express from "express";
import {
  getAllTodos,
  getTodo,
  makeTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController.js";

const todoRoutes = express.Router();

todoRoutes.get("/todos", getAllTodos);
todoRoutes.get("/:id", getTodo);
todoRoutes.post("/", makeTodo);
todoRoutes.delete("/:id", deleteTodo);

// todoRoutes.put("/:id", updateTodoStatus);
todoRoutes.put("/:id", updateTodo);

export default todoRoutes;
