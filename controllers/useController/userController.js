// const asyncHandler = (handler) => (req, res, next) =>
//   Promise.resolve(handler(req, res, next)).catch(next);
const asyncHandler = require("express-async-handler")

const jwt = require("jsonwebtoken")

// Import the User model and isValidPhoneNumber function
const User = require('../../Models/User');

const { isValidPhoneNumber } = require('../../hooks/email-phoneNumber');
const AccessToken = require("twilio/lib/jwt/AccessToken");
const { hashPassword, compareHashPassword } = require("../../hooks/hashPassword");
const { generateAccessToken, generateRefreshToken } = require("../../hooks/generateJWTtokens")
const { getUserbyPhoneNumber, getUserProfile, createUser, createUserProfile, updateUserPhoneNumber, updateProfile, checkuserProfile, searchById, getPersonalUserProfile, getAllUser } = require("../../services/user/userServices");
const { use } = require("../../routes/public/property/route");
const { uploadImage } = require("../../upload/uploadDocuments")
/**todo user controller to auth , delete user,create, userController*/
// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { password, fullName, phoneNumber, role, entity } = req.body;

  if (isValidPhoneNumber(phoneNumber)) {
    const user = await getUserbyPhoneNumber(phoneNumber);
    if (user) {
      return res.json("user already exists")
    }
    const hash = await hashPassword(password);
    const data = await createUser(
      hash,
      fullName,
      role,
      phoneNumber,
      entity
    );

    try {
      console.log('Registered user:', data);
      const newUserProfile = await createUserProfile(
        data._id,
        '',
        '',
        '0x8787STEWV545447448484848DDAJWWBWEVFE',
        phoneNumber,
        '',
        fullName,
        entity
      );
      console.log('New profile', newUserProfile)
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
const loginUser = asyncHandler(async (req, res) => {
  const { password, fullName, phoneNumber, role } = req.body;

  if (isValidPhoneNumber(phoneNumber)) {
    try {
      const user = await getUserbyPhoneNumber(phoneNumber);

      if (!user) {
        return res.status(400).json("Confirm Your details");
      }

      // Add  password validation logic here
      if (user) {
        const isPasswordCorrect = await compareHashPassword(password,
          user.password)
        if (isPasswordCorrect) {
          const accestoken = await generateAccessToken(user.phoneNumber, user.role, user._id)

          const refreshToken = await generateRefreshToken(user.phoneNumber, user.role, user._id)

          res.cookie("refreshToken", refreshToken,
            {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
              secure: false, // o be changed on production to true
              sameSite: "None"
            });
          res.status(200).json({ userdata: user, accesstokens: accestoken });
        } else {
          res.status(400).json("Confirm your credentials");
        }
      };

      // If password is valid, send success response

    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json("Internal Server Error");
    }
  } else {
    res.status(400).json("Confirm your phone number");
  }
})

//current user infomation
//@private access
const currentUser = asyncHandler(async (req, res) => {
  const { phoneNumber, role, _id } = req.user;

  try {
    const user = await getUserProfile(phoneNumber);

    res.json(user)



  } catch (error) {
    res.status(500).json({ message: error.message })
  }

})

const updateUserProfile = asyncHandler(async (req, res) => {


  let { idNumber, identification, ethereumAddress, newPhoneNumber, email, fullName, entity } = req.body;




  try {

    const isProfileExists = await checkuserProfile(req.user.id);
    if (isProfileExists) {
      let identificationUpload = ""
      if (identification.startsWith('http') || identification.startsWith('https')) {
        identificationUpload = await uploadImage(identification)
      } else {
        identificationUpload = identification
      }
      const newUserProfileupdate = await updateProfile(
        req.user.id,
        identificationUpload,
        idNumber,
        ethereumAddress,
        newPhoneNumber,
        email,
        fullName,
        entity
      );
      if (!newUserProfileupdate) {
        return res.status(401).json("failed to  update profile")
      }
      return res.status(200).json({ message: "update successively" })
    }

    let identificationUpload = "";
    if (identification.length > 0) {
      identificationUpload = await uploadImage(identification)
    }
    const newUserProfile = await createUserProfile(
      req.user.id,
      idNumber,
      identificationUpload,
      ethereumAddress,
      newPhoneNumber,
      email,
      fullName,
      entity
    );
    if (!newUserProfile) {
      return res.status(401).json("failed to  update profile")
    }
    const result = await updateUserPhoneNumber(req.user.id, newPhoneNumber)

    if (!result) {
      return res.status(401).json("failed to  update phone number")
    }
    return res.status(201).json({ message: "user profile created" })



  } catch (error) {
    console.log(error)
    return res.status(400).json("Failed to Update details");


  }


})

// Register a user
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;


  if (!cookies?.refreshToken) return res.status(401).json({ message: "Unauthorizeda" });

  const refreshToken = cookies.refreshToken;

  jwt.verify(
    refreshToken,
    process.env.ACCESS_TOKEN_SECERT,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" })

      const foundUser = await User.findOne({ phoneNumber: decoded.user.phoneNumber });
      if (!foundUser) return res.status(401).json({ message: "Unauthorizedb" });
      const accessToken = await generateAccessToken(foundUser.phoneNumber, foundUser.role, foundUser._id)
      res.status(200).json({ userdata: foundUser, accessToken: accessToken });


    })
  )


});

//search by id

const searchUserByIdNumber = asyncHandler(async (req, res) => {
  const { idNumber } = req.params

  try {
    const userIdNumber = await searchById(idNumber);
    if (!userIdNumber) {
      return res.status(401).json({ message: "User Id Not Found!" })
    }
    return res.status(200).json(userIdNumber)

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
})

//get userPersonalProfile
const userPersonalProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await getPersonalUserProfile(req.user.id);
    if (!profile) return res.status(400).json({ message: 'No Profile Found' });
    res.status(200).json(profile)
  } catch (erro) {
    return res.status(500).json({ message: 'Internal server error' });

  }

})

// get user list
const allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await getAllUser()
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});



const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) return res.status(204) //no content

  res.clearCookie("refresToken", {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  })
  res.json({ message: "Cookie cleared" });
}
module.exports = {
  registerUser,
  loginUser,
  currentUser,
  updateUserProfile,
  logout,
  refresh,
  searchUserByIdNumber,
  userPersonalProfile
};
