const express = require("express");
const router = express.Router();


const {validateToken} = require("../../middleWare/validateTokenHandler");
const {onlyRegistrarOrAdmin} = require("../../middleWare/onlyRegistrarOradmin")
const {getAllPropertiesEnlisted,getTransfers} = require("../../controllers/Properties/admin/propertyController")




//router.get('/getAllProperties',validateToken,onlyRegistrarOrAdmin,getAllPropertiesEnlisted);
router.get('/getAllProperties',getAllPropertiesEnlisted);

//get all property transfers

router.get('/getAllTransfers',validateToken,onlyRegistrarOrAdmin,getTransfers);







module.exports=router;