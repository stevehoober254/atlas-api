// const asyncHandler = (handler) => (req, res, next) =>
//   Promise.resolve(handler(req, res, next)).catch(next);
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Import the User model and isValidPhoneNumber function
const User = require('../Models/User');
const Profile = require("../Models/Profile")
const {isValidPhoneNumber} = require('../hooks/email-phoneNumber');

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { password, fullName, phoneNumber, role } = req.body;

  if (isValidPhoneNumber(phoneNumber)) {
    const user = await User.findOne({phoneNumber});
    if(user){
        return res.json("user already exists")
    }
    const hashPassword = await bcrypt.hash(password,5);
    const data = new User({
      password: hashPassword,
      fullName: fullName,
      role: role,
      phoneNumber: phoneNumber,
    });

    try {
      const dataToSave = await data.save();
      console.log('Saved data:', dataToSave);
      res.status(200).json("Register successfully");
    } catch (error) {
      console.log('Save error:', error);
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json("Confirm your phone number");
  }
});

//login
const loginUser= asyncHandler(async (req, res) => {
    const { password, fullName, phoneNumber, role } = req.body;

    if (isValidPhoneNumber(phoneNumber)) {
        try {
            const user = await User.findOne({ phoneNumber });

            if (!user) {
                return res.status(400).json("Confirm Your details");
            }

            // Add  password validation logic here
                     if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            )
        if(isPasswordCorrect){
            const accestoken = jwt.sign({
                user:{
                    phoneNumber: user.phoneNumber,
                    role:user.role,
                    id:user._id
                }
            },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"5m"})
            res.status(200).json({user: user,accestoken:accestoken});
        }else{
            res.status(400).json("Confirm your credentials");
        }};

            // If password is valid, send success response
            
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json("Internal Server Error");
        }
    } else {
        res.status(400).json("Confirm your phone number");
    }})

    //current user infomation
    //@private access
    const currentUser= asyncHandler(async (req, res) => {
      const {phoneNumber,role,_id} = req.user;
      
        try{
           await User.findOne({phoneNumber}).populate("userProfile").exec().then(user =>{
            res.json(user)
          })
    //  const data = await User.find().exec()
    //  .then(user =>{
    //     res.json(user);
    
    //  });
     
        }catch(error){
            res.status(500).json({message: error.message})
        }
       
    })

const updateUserProfile = asyncHandler(async(req,res)=>{
  const {phoneNumber,role,id} = req.user;
  
  let { gender,kraPin,idNumber,ethereumAddress,newPhoneNumber} = req.body;
  newPhoneNumber = (phoneNumber === newPhoneNumber) ? phoneNumber : newPhoneNumber;

  

  try{
    const newUserProfile = new Profile({
      gender: gender,
      kraPin: kraPin,
      idNumber: idNumber,
      ethereumAddress: ethereumAddress,
      phoneNumber: newPhoneNumber,
    });

    
   await newUserProfile.save();
  
  
  await User.findOneAndUpdate({phoneNumber},{$set:{
    UserProfile:newUserProfile._id,
    phoneNumber:newPhoneNumber

  }})

  res.status(200).json({message:"update successively"})
  }catch(error){
    console.log(error)
    res.status(400)
    throw new Error("Failed to Update details",error)
    
  }
  

})    
module.exports = { registerUser,loginUser,currentUser,updateUserProfile };
