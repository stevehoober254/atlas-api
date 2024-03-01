const express = require("express");
const router = express.Router();


const {validateToken} = require("../../middleWare/validateTokenHandler");
const {onlyRegistrarOrAdmin} = require("../../middleWare/onlyRegistrarOradmin")
const {getAllPropertiesEnlisted} = require("../../controllers/EnlistProperty/enlistproperty")




//router.get('/getAllProperties',validateToken,onlyRegistrarOrAdmin,getAllPropertiesEnlisted);
router.get('/getAllProperties',getAllPropertiesEnlisted);




module.exports=router;