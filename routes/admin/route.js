const express = require("express");
const router = express.Router();


const {validateToken} = require("../../middleWare/validateTokenHandler");
const {onlyRegistrarOrAdmin} = require("../../middleWare/onlyRegistrarOradmin")
const {onlyAdmin} = require("../../middleWare/onlyAdmin")
const {getAllPropertiesEnlisted,getTransfers,countTotalProperties,getEncumbrances} = require("../../controllers/Properties/admin/propertyController")
const {getUsersProfile,rejectProfile,verifyProfile,getRejectedUsersProfiles,getVerifiedUsersProfiles} = require("../../controllers/Properties/admin/usersProfileController")




//router.get('/getAllProperties',validateToken,onlyRegistrarOrAdmin,getAllPropertiesEnlisted);
router.get('/getAllProperties',getAllPropertiesEnlisted);

//get all property transfers

router.get('/getAllTransfers',validateToken,onlyRegistrarOrAdmin,getTransfers);

//get all users profile

router.get('/getUsersProfile',validateToken,onlyRegistrarOrAdmin,getUsersProfile);

//return total number of properties
router.get('/totalProperties',validateToken,countTotalProperties); //add validate and onlyadmin

//get all Encumbrances
router.get('/getAllEncumbrances',getEncumbrances); //add validate and onlyadmin

//get all verified profiles
router.get('/verifiedProfiles',validateToken,onlyAdmin,getVerifiedUsersProfiles); //add validate and onlyadmin

//get all verified profiles
router.get('/rejectedProfiles',validateToken,onlyAdmin,getRejectedUsersProfiles); //add validate and onlyadmin

//verify profile

router.get('/verfyProfile',validateToken,onlyAdmin,verifyProfile); //add validate and onlyadmin

//reject profile

router.get('/rejectProfile',validateToken,onlyAdmin,rejectProfile); //add validate and onlyadmin










module.exports=router;