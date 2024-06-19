const express = require("express");
const router = express.Router();


const { validateToken } = require("../../middleWare/validateTokenHandler");
const { onlyRegistrarOrAdmin } = require("../../middleWare/onlyRegistrarOradmin")
const { onlyAdmin } = require("../../middleWare/onlyAdmin")
const { getAllPropertiesEnlisted, getTransfers, countTotalProperties, getEncumbrances, handleVerifyProperty, handleCancelPropertyVerification } = require("../../controllers/Properties/admin/propertyController")
const { getUsersProfile, verifyProfile, getRejectedUsersProfiles, getVerifiedUsersProfiles, rejectProfile } = require("../../controllers/Properties/admin/usersProfileController")


// verify property
router.post('/verifyProperty', handleVerifyProperty)
router.post('/rejectProperty', handleCancelPropertyVerification)

//router.get('/getAllProperties',validateToken,onlyRegistrarOrAdmin,getAllPropertiesEnlisted);
router.get('/getAllProperties', getAllPropertiesEnlisted);

//get all property transfers

router.get('/getAllTransfers', validateToken, onlyRegistrarOrAdmin, getTransfers);

//get all users profile

router.get('/getUsersProfile', validateToken, onlyRegistrarOrAdmin, getUsersProfile);

//return total number of properties
router.get('/totalProperties', validateToken, countTotalProperties); //add validate and onlyadmin

//get all Encumbrances
router.get('/getAllEncumbrances', getEncumbrances); //add validate and onlyadmin

//get all verified profiles
router.get('/verifiedProfiles', validateToken, onlyAdmin, getVerifiedUsersProfiles); //add validate and onlyadmin

//get all verified profiles
router.get('/rejectedProfiles', validateToken, onlyAdmin, getRejectedUsersProfiles); //add validate and onlyadmin

//verify profile

router.post('/verifyProfile', validateToken, onlyAdmin, verifyProfile); //add validate and onlyadmin

//reject profile


router.post('/rejectProfile', validateToken, onlyAdmin, rejectProfile); //add validate and onlyadmin










module.exports = router;