const connectDB = require("../db");
const Todo = require("../models/todo");

connectDB();

const createTodo = async (req, res) => {
  console.log("Adsfads");
  
  try {
    console.log("hello")
    const {task,userId } = req.body;
    console.log(req.body);
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: "Error creating task", error: err });
  }
}

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tasks", error: err });
  }
}

const getTodosByUserId = async (req, res) => {
  try {
    const id = req.params.userId;
    const todos = await Todo.find({userId:id}); // first object that matches userId
    console.log(todos);
    if(todos){ 
      res.status(200).json(todos);
    }
    
  } catch (err) {
    res.status(400).json({ message: "Error fetching tasks", error: err });
  }
}

const updateTodo = async (req, res) => {
  try {
    console.log("asdfads");
    const todoId = req.params.id;
    // console.log(todoId)
    const updateTodo = await Todo.findById({_id: todoId});
    console.log(updateTodo)
    const todo = req.body;
    if(updateTodo){
        updateTodo.task = todo.task;
        console.log("updateTodo.task",updateTodo.task)
        await updateTodo.save();
        res.status(200).json(updateTodo);
    }else{
        return res.status(404).json({ message: "Task not found" });
    }
   
  } catch (err) {
    res.status(400).json({ message: 'Error updating todo', error: err });
  }
}

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    // console.log("todoId", todoId);

    const foundTodoById = await Todo.findById({ _id: todoId });

    if (foundTodoById) {
      const deleteResult = await Todo.deleteOne({ _id: todoId });
      res
        .status(200)
        .json({ message: "Task deleted successfully", deleteResult });
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error deleting task", error: err });
  }
}

module.exports={createTodo,getTodos,updateTodo,deleteTodo,getTodosByUserId};