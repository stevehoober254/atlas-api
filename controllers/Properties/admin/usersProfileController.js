const {getAllUserProfile} = require("../../../services/user/userServices")

const asyncHandler = require("express-async-handler")

//get all users profile
const getUsersProfile = asyncHandler(async (req, res) =>{
    try{
        const usersProfile = await  getAllUserProfile();
        if(!usersProfile || usersProfile.length ==0){
            return res.status(401).json({success: false , message :"No User Profile Found!"})
        }

        return res.status(200).json(usersProfile );

    }catch(error){
        return res.status(500).json({success: false , message :"Try another time!"})

    }
})


module.exports={
    getUsersProfile
}
