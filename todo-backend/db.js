const mongoose = require('mongoose');

require('dotenv').config();

const mongoURI = process.env.mongoURI;

const connectDB = async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("connected to MongoDB!");
    }catch(err){
        console.log("Error Connecting to MongoDB:", err);
    }
}

module.exports = connectDB;