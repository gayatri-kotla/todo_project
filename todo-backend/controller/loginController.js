const connectDB = require("../db");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const User = require("../models/user");
const JWT = require("jsonwebtoken")


connectDB();

const loginUser = async(req,res)=>{
    try{
        const {userName,passWord}=req.body;

        if(!userName || !passWord){
            return res.status(404).send({
                success: false,
                message: "Invalid userName or password",
              });
        }

        const user = await User.findOne({userName});
        console.log(user);

        if(!user){
            return res.status(404).send({
                success: false,
                message: "userName is not registered",
              }); 
        }

        const match = await comparePassword(passWord,user.passWord);

        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
              });
        }

        const token =await JWT.sign(
            { userName: user.userName },
            "user",
            { expiresIn: "2d" }
          );

          res.status(200).send({
            success: true,
            message: "Login successful",
            user: user,
            token,
          });
    }catch(err){
        console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login",
      err,
    })
}
}
const createUser = async(req,res)=>{
    try{
        const{userName,passWord,role} = req.body;
        const hashedPassword = await hashPassword(passWord)
    //   console.log(hashedPassword)
        const newUser = new User({userName,passWord:hashedPassword,role});
        await newUser.save();
        res.status(201).json(newUser);

    }catch(err){
        res.status(400).json({ message: "Error creating task", error: err });
    }
}


const getUsers = async(req,res)=>{
    try{
        const users = await User.find();
        console.log(users);
        res.status(201).json(users);

    }catch(err){
        res.status(400).json({ message: "Error getting tasks", error: err });
    
    }
}
module.exports = {createUser,getUsers,loginUser};