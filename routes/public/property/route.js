const express = require("express");
const router = express.Router();

const {validateToken} = require("../../../middleWare/validateTokenHandler")
const {getAllUserProperty,verifyForProcessing,enlistProperty,transferPropertyOwnership,searchPropertyTitle,updatePropertySize,searchForProperty,getOnlyFirstVerifiedProperties} = require("../../../controllers/Properties/public/propertyController")

router.get("/userProperties",validateToken,getAllUserProperty);

router.post("/verify",validateToken,verifyForProcessing)
//put validateToken in production
router.post("/enlistProperty",enlistProperty)

router.post("/transfer",validateToken,transferPropertyOwnership)

//search property title

router.get("/search/:titleLR",searchPropertyTitle); //validation in production

//update Property size
router.post("/updateProperty",validateToken,updatePropertySize) //change to patch

//search for property
router.get("/searchProperty",validateToken,searchForProperty)

//get first 10 verified properties
router.get("/verifiedProperties",getOnlyFirstVerifiedProperties) //anyone can view this





module.exports = router
