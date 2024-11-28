const express = require("express");
const {createTodo,updateTodo,deleteTodo,getTodos, getTodosByUserId}=require("../controller/todoController");
const{isAdmin,requireSignIn} = require("../middleware/authMiddleware");
const todoRoute = express.Router();

todoRoute.post("/todo",requireSignIn,createTodo);
todoRoute.put("/todo/:id",requireSignIn,updateTodo,);
todoRoute.get("/todo",getTodos,requireSignIn,isAdmin);
todoRoute.get("/todo/:userId",requireSignIn,getTodosByUserId)
todoRoute.delete("/todo/:id",requireSignIn,deleteTodo);

module.exports = todoRoute;
