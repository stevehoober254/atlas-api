const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../Models/User")
const asyncHandler = require("express-async-handler")
const {ObjectId} = require("mongodb")

/**auth controller all password reset,email */

const {getPasswordResetURL,resetPasswordTemplate,transpoter} = require("../modules/email")
const {usePasswordHashToMakeToken} =require("../hooks/usePasswordHashToMakeToken")

const sendPasswordResetEmail = asyncHandler(async(req,res)=>{
    const {email} = req.body
    let user;
    try{
        user = await User.findOne({email}).exec();


    }catch(err){
        res.status(404).json("Check your email")

    }
    

    const token = usePasswordHashToMakeToken({password:user.password,_id:user._id,createdAt:user.createdAt})
    const url = getPasswordResetURL(user,token)
    const emailTemplate = resetPasswordTemplate(user,url)

    const sendEmail = ()=>{
        transpoter.sendMail(emailTemplate,(err,info)=>{
            if(err){
                res.status(500).json("Error sending email")

            }
            res.status(200).json("** Email sent **")
        })
    }
sendEmail()
})


const receiveNewPassword = (req, res) => {
    const { userId, token } = req.params
    const { password } = req.body
  
    User.findOne({ _id: userId })  
      .then(user => {
        const secret = user.password + "-" + user.createdAt
       
        
        const payload = jwt.decode(token, secret)
        console.log(payload)
        const userIdObject = new ObjectId(payload.userId);
        if (userIdObject.equals(user._id)) {
            
          
            
            bcrypt.hash(password,5,(err, hash)=> {
              if (err) return
              User.findByIdAndUpdate({ _id: userId}, { password: hash })
                .then(() => res.status(202).json("Password changed accepted"))
                .catch(err => res.status(500).json(err))
            })
         
        }
        
      })
  
      
  }

  module.exports ={
    receiveNewPassword,
    
    sendPasswordResetEmail
  }