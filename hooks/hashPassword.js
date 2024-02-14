 //const hashPassword = await bcrypt.hash(password,5);
 const bcrypt = require("bcryptjs")
 const hashPassword =async (password)=>{
    let hashpass = await  bcrypt.hash(password,5);

    return   hashpass;

 }


 const compareHashPassword =async (newPassword,oldUserHashPassword)=>{
    let isPasswordCorrect =   await bcrypt.compare(
        newPassword,
        oldUserHashPassword
      )

    return   isPasswordCorrect;

 }
 module.exports ={
    hashPassword,
    compareHashPassword
 }