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
    const userProfile = await Profile.findOne({user:user_id});
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


// user: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//     unique: true // Ensures each user has only one profile
//   },
//   gender: {
//     type: String,
//     enum: ["male", "female", "other"],
//     required: true,
//   },
//   dateOfBirth: {
//     type: Date,
//     required: false,
//   },
//   idNumber: {
//     type: String,
//     unique:true,
//     required: true,
//   },
//   kraPin: {
//     type: String,
//     required: true,
//   },
//   identification: {
//     type: String,
//     required: false,
//   },
//   kraCertificate: {
//     type: String,
//     required: false,
//   },
//   ethereumAddress: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: false,
//   },
//   language: {
//     type: String,
//     required: false,
//   },
// },

const createUserProfile = async(user_id,gender,kraPin,idNumber,ethereumAddress,newPhoneNumber,dateOfBirth,kraCertificate,address,language)=>{
    const newUserProfile = new Profile({
        user:user_id,
        gender: gender,
        kraPin: kraPin,
        dateOfBirth:dateOfBirth,
        kraCertificate:kraCertificate,
        idNumber: idNumber,
        ethereumAddress: ethereumAddress,
        phoneNumber: newPhoneNumber,
        address:address,
        language:language,
      });
      const  result =await newUserProfile.save();
      return !!result
}

const updateUserPhoneNumber = async (user_id,newPhoneNumber) => {
    const updatePhone= await Profile.findOneAndUpdate(
        { user: user_id }, // Query by user ObjectId
        { $set: { phoneNumber: newPhoneNumber } },
        { new: true } // To return the updated document
    );

    return !!updatePhone;
}

//update user Profile

const updateProfile = async (user_id, gender,kraPin,idNumber,ethereumAddress,newPhoneNumber,dateOfBirth,kraCertificate,address,language) => {
    const update= await Profile.findOneAndUpdate(
        { user: user_id }, // Query by user ObjectId
        { $set: { gender: gender,
            kraPin: kraPin,
            dateOfBirth:dateOfBirth,
            kraCertificate:kraCertificate,
            idNumber: idNumber,
            ethereumAddress: ethereumAddress,
            phoneNumber: newPhoneNumber,
            address:address,
            language:language } },
        { new: true } // To return the updated document
    );

    return !!update;
}
//check if user profile exists

const checkuserProfile = async(user_Id)=>{
    const existingProfile = await Profile.findOne({ user: user_Id });
    return !!existingProfile;
}

module.exports = {getUserbyPhoneNumber,
    getUserProfile,
    createUser,
updateUserPhoneNumber,
createUserProfile,
getUserById,
getUserProfilebyId,
updateProfile,
checkuserProfile }