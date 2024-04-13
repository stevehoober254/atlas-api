const {getAllUserProfile,verifyUserProfile,getRejectedUsersProfile,getVerifiedUsersProfile,rejectUserProfile} = require("../../../services/user/userServices")

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

//verify
const verifyProfile = asyncHandler(async(req,res)=>{
    const {profile_id} = req.body;
    try{
        const verifyprofile = await verifyUserProfile(profile_id);

        if(!verifyprofile){
            return res.status(401).json({success: false , message :"fail to verify profile"})

        }
        return res.status(200).json({success:true});

    }catch(error){
        return res.status(500).json({success: false , message :"Try another time!"})

    }
})



//reject two

const rejectProfile = asyncHandler(async(req,res)=>{
    const {profile_id} = req.body;
    try{
        const rejectresult = await rejectUserProfile(profile_id);

        if(!rejectresult){
            return res.status(401).json({success: false , message :"fail to verify profile"})

        }
        return res.status(200).json({success:true});

    }catch(error){
        return res.status(500).json({success: false , message :"Try another time!"})

    }
})



//get all verified users profile
const getVerifiedUsersProfiles= asyncHandler (async (req,res) => {
   try{
    const profiles = await getVerifiedUsersProfile();
    if(profiles.length === 0 ){
        return res.status(401).json({success: false , message :"no profile yet"})

    }
    return res.status(200).json(profiles);

   }catch(error){
    return res.status(500).json({success: false , message :"Try another time!"})

   }
})

//get all rejected users profile
const getRejectedUsersProfiles= asyncHandler (async (req,res) => {
    try{
     const profiles = await getRejectedUsersProfile();
     if(profiles.length === 0 ){
         return res.status(401).json({success: false , message :"no profile yet"})
 
     }
     return res.status(200).json(profiles);
 
    }catch(error){
     return res.status(500).json({success: false , message :"Try another time!"})
 
    }
 })

module.exports={
    getUsersProfile,
    rejectProfile,
    verifyProfile,
    getVerifiedUsersProfiles,
    getRejectedUsersProfiles,
   
}
