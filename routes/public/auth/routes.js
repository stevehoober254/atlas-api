const express = require("express");
const router = express.Router();
const User = require("../../../Models/User")

// const mongoose = require('mongoose');
const {isValidEmail,isValidPhoneNumber} = require("../../../hooks/email-phoneNumber");
const { registerUser, loginUser, currentUser, updateUserProfile,logout,refresh,searchUserByIdNumber,userPersonalProfile } = require("../../../controllers/useController/userController");
const {validateToken} = require("../../../middleWare/validateTokenHandler");
const {enlistProperty,getAllUsersIdNumber} = require("../../../controllers/Properties/public/propertyController")



router.post('/signup',registerUser)

//login
router.post("/login",loginUser);

router.get("/refresh",refresh)


//Get all Method
// router.get('/profile',validateToken,currentUser)

//update user profile
router.post("/profile",validateToken,updateUserProfile)

//user enlist property

router.post("/enlistProperty",enlistProperty)

//getAllUserIds
router.get("/usersId",validateToken,getAllUsersIdNumber)

//search user by id
router.get("/search/:idNumber",searchUserByIdNumber)

//getuserprofile
router.get("/userProfile",validateToken,userPersonalProfile)



//Get by ID Method
router.patch('/:user_id', async(req, res) => {
    try{
        const data = await User.findById(req.params.user_id);
        res.json(data);
           }catch(error){
               res.status(500).json({message: error.message})
           }
})

//Update by ID Method
router.patch('/:user_id',async (req, res) => {
    try{
        let id = req.params.user_id;
        const upDateData = req.body;
        const options = {new:true};
        const results = await User.findByIdAndUpdate(id,upDateData,options);
        res.send(results);

    }catch(error){
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/:user_id',async (req, res) => {
    try{
let id = req.params.user_id;
const data = await User.findByIdAndDelete(id);
res.send(`Deleted the ${data.username} and ${data._id} successfull`)
    }catch(error){
res.status(400).json({message:error.message});
    }
    
})

module.exports=router;