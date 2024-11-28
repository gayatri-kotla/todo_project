const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    passWord:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
});

const User = mongoose.model('User',userSchema,'users');

module.exports = User;