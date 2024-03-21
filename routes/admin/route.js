const express = require("express");
const router = express.Router();


const {validateToken} = require("../../middleWare/validateTokenHandler");
const {onlyRegistrarOrAdmin} = require("../../middleWare/onlyRegistrarOradmin")
const {getAllPropertiesEnlisted,getTransfers,countTotalProperties,getEncumbrances} = require("../../controllers/Properties/admin/propertyController")
const {getUsersProfile} = require("../../controllers/Properties/admin/usersProfileController")




//router.get('/getAllProperties',validateToken,onlyRegistrarOrAdmin,getAllPropertiesEnlisted);
router.get('/getAllProperties',getAllPropertiesEnlisted);

//get all property transfers

router.get('/getAllTransfers',validateToken,onlyRegistrarOrAdmin,getTransfers);

//get all users profile

router.get('/getUsersProfile',validateToken,onlyRegistrarOrAdmin,getUsersProfile);

//return total number of properties
router.get('/totalProperties',countTotalProperties); //add validate and onlyadmin

//get all Encumbrances
router.get('/getAllEncumbrances',getEncumbrances); //add validate and onlyadmin









module.exports=router;