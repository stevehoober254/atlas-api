const User = require('../../Models/User');
const Profile = require("../../Models/Profile")

const createUser = async(passwordHash,fullName,role,phoneNumber)=>{
    const data = new User({
        password: passwordHash,
        fullName: fullName,
        role: role,
        phoneNumber: phoneNumber,
      });
      return data;
}

const getUserbyPhoneNumber =async(phoneNumber)=>{
    const user = await User.findOne({phoneNumber});
    return user;

}
//getuser by idNumber
const getUserProfilebyId =async(user_id)=>{
    const userProfile = await Profile.findOne({user_id});
    return userProfile;

}

const getUserProfile =async(phoneNumber)=>{
    const user = await User.findOne({phoneNumber}).populate("userProfile").exec()
    return user;

}


const getUserById = async(user_id)=>{
    const user = await User.findOne({_id:user_id}).exec()
    return user;
}



const createUserProfile = async(user_id,gender,kraPin,idNumber,ethereumAddress,newPhoneNumber)=>{
    const newUserProfile = new Profile({
        user:user_id,
        gender: gender,
        kraPin: kraPin,
        idNumber: idNumber,
        ethereumAddress: ethereumAddress,
        phoneNumber: newPhoneNumber,
      });
      const  result =await newUserProfile.save();
      return !!result
}

const updateUserPhoneNumber = async(profile_id,newPhoneNumber,phoneNumber)=>{
    await User.findOneAndUpdate({phoneNumber},{$set:{
        UserProfile:profile_id,
        phoneNumber:newPhoneNumber
    }})
}

module.exports = {getUserbyPhoneNumber,
    getUserProfile,
    createUser,
updateUserPhoneNumber,
createUserProfile,
getUserById,
getUserProfilebyId }