const express = require("express");

const {createUser,getUsers,loginUser} = require("../controller/loginController")
const{requireSignIn} = require("../middleware/authMiddleware");
const loginRoute = express.Router();

loginRoute.post("/user",createUser);
loginRoute.get("/users",requireSignIn, getUsers);
loginRoute.post("/login",loginUser);


module.exports = loginRoute;