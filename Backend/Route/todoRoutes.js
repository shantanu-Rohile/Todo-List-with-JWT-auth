// In /Route/todoRoutes.js
import express from "express";
import Todo from "../Model/todoModel.js"; // <--- Import the correct model
import {authMiddleware} from '../Middleware/authMiddleware.js'

const todoRouter = express.Router();

todoRouter.use(authMiddleware);
todoRouter.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }); 
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).send("Error fetching todos");
  }
});
todoRouter.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).send("Task is required");
    }
    // req.userId comes from the authMiddleware
    const newTodo = await Todo.create({ task, userId: req.userId });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).send("Error creating todo");
  }
});

// DELETE a todo FOR THE LOGGED-IN USER
todoRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Find *and* verify ownership in one step
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

    if (!todo) {
      // This means the todo doesn't exist OR the user doesn't own it
      return res.status(404).send("Todo not found or user not authorized");
    }
    res.status(200).send("Todo deleted");
  } catch (error) {
    res.status(500).send("Error deleting todo");
  }
});

export default todoRouter;