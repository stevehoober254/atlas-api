
const jwt = require("jsonwebtoken")

const generateAccessToken =async(userPhoneNumber,userRole,userId)=>{

    const accestoken = jwt.sign({
            user:{
                phoneNumber: userPhoneNumber,
                role: userRole,
                id: userId
            }
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"1d"}) // to change to 15 mins on production

        return accestoken;


}

const generateRefreshToken =async(userPhoneNumber,userRole,userId)=>{

    const refreshtoken = jwt.sign({
            user:{
                phoneNumber: userPhoneNumber,
                role: userRole,
                id: userId
            }
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"1d"})

        return refreshtoken;


}

module.exports ={
    generateAccessToken,
    generateRefreshToken
}