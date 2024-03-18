const express = require("express");
const router = express.Router();


const {validateToken} = require("../../middleWare/validateTokenHandler");
const {onlyRegistrarOrAdmin} = require("../../middleWare/onlyRegistrarOradmin")
const {getAllPropertiesEnlisted,getTransfers} = require("../../controllers/Properties/admin/propertyController")
const {getUsersProfile} = require("../../controllers/Properties/admin/usersProfileController")




//router.get('/getAllProperties',validateToken,onlyRegistrarOrAdmin,getAllPropertiesEnlisted);
router.get('/getAllProperties',getAllPropertiesEnlisted);

//get all property transfers

router.get('/getAllTransfers',validateToken,onlyRegistrarOrAdmin,getTransfers);

//get all users profile

router.get('/getUsersProfile',validateToken,onlyRegistrarOrAdmin,getUsersProfile);








module.exports=router;