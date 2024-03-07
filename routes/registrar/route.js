const express = require("express");
const router = express.Router();


const {validateToken} = require("../../middleWare/validateTokenHandler");
const {onlyRegistrarOrAdmin} = require("../../middleWare/onlyRegistrarOradmin")
const {getAllRegistryPropertiesEnlisted,getAllPropertiesPerCounty} = require("../../controllers/Properties/registrar/propertyController")




router.get('/propertyPerCounty',validateToken,getAllPropertiesPerCounty);
router.get('/getAllProperties',getAllRegistryPropertiesEnlisted);




module.exports=router;