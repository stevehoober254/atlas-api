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

const getUserProfile =async(phoneNumber)=>{
    const user = await User.findOne({phoneNumber}).populate("userProfile").exec()
    return user;

}

const createUserProfile = async(gender,kraPin,idNumber,ethereumAddress,newPhoneNumber)=>{
    const newUserProfile = new Profile({
        gender: gender,
        kraPin: kraPin,
        idNumber: idNumber,
        ethereumAddress: ethereumAddress,
        phoneNumber: newPhoneNumber,
      });
      return newUserProfile;
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
createUserProfile }