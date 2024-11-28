const JWT = require('jsonwebtoken');

const User = require("../models/user");

// Protected routes, token-based
const requireSignIn = async(req,res,next)=>{
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({error:"token not found"});
    }
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"unauthorized"});
    }
    try{
        const decoded = JWT.verify(token,"user");
        req.user = decoded;
       next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:"invalid token"});
    }
};

// Middleware for admin access

const isAdmin= async(req,res,next)=>{
    try{
        const user = await User.findOne({userName:req.userName});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
              });
        }

        if (user.role !== "admin") {
            return res.status(401).send({
              success: false,
              message: "Unauthorized Access",
            });
          } else {
            next();
          }

    }catch(err){
        console.log(err);
        res.status(401).send({
            success: false,
            message: "Error in admin middleware",
            error,
          });
    }
}

module.exports = {
    requireSignIn,
    isAdmin,
  };