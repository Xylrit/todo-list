import { Todo } from "../models/todo_Model.js";

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    console.log(`Error fetching todos ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching todo.",
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json({ Todo: todo });
  } catch (error) {
    console.log(`Error fetching todo ${error}`);

    res.status(500).json({
      message: "An error occurred while fetching todo.",
    });
  }
};

const makeTodo = async (req, res) => {
  const todoTask = req.body;
  if (todoTask.todo) {
    try {
      const todo = new Todo({
        todo: todoTask.todo,
      });

      await todo.save();

      res.status(201).json(todo);
    } catch (error) {
      console.log(`Error creating todo ${error}`);

      res.status(500).json({
        message: "An error occurred while creating todo.",
      });
    }
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "todo deleted successfully", todo });
  } catch (error) {
    console.log(`Error deleting todo ${error}`);
    res.status(500).json({
      message: "An error occurred while deleting todo.",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      todo: body.todo,
      status: body.status,
    });
    res.json({ message: "todo updated successfully", todo });
  } catch (error) {
    console.log(`Error updating todo ${error}`);
    res.status(500).json({
      message: "An error occurred while updating todo.",
    });
  }
};

export { getAllTodos, getTodo, makeTodo, updateTodo, deleteTodo };
//test link
