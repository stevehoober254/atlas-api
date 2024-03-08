const express = require("express");
const router = express.Router();


const {validateToken} = require("../../middleWare/validateTokenHandler");
const {onlyRegistrarOrAdmin} = require("../../middleWare/onlyRegistrarOradmin")
const {getAllRegistryPropertiesEnlisted,getAllPropertiesPerCounty,propertyVerification,propertyRejection} = require("../../controllers/Properties/registrar/propertyController")




router.get('/propertyPerCounty',validateToken,getAllPropertiesPerCounty);
router.get('/getAllProperties',getAllRegistryPropertiesEnlisted);
router.post('/propertyVerification',validateToken,propertyVerification);
router.post('/propertyRejection',validateToken,propertyRejection);





module.exports=router;