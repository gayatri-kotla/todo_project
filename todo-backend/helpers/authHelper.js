const bcrypt = require("bcrypt");

const hashPassword = async (password)=>{
    try{
        const saltRounds  = 10;
        const pwd = await bcrypt.hash(password,saltRounds);
        console.log(pwd);
        return pwd;
    }catch(error){
        console.log(err);
    }

}

const comparePassword = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}

module.exports = {
    hashPassword,comparePassword
}