const express = require("express");
const router = express.Router();

const {validateToken} = require("../../../middleWare/validateTokenHandler")
const {getAllUserProperty,verifyForProcessing,enlistProperty,transferPropertyOwnership,searchPropertyTitle} = require("../../../controllers/Properties/public/propertyController")

router.get("/userProperties",validateToken,getAllUserProperty);

router.post("/verify",validateToken,verifyForProcessing)
//put validateToken in production
router.post("/enlistProperty",enlistProperty)

router.post("/transfer",validateToken,transferPropertyOwnership)

//search property title

router.get("/search/:titleLR",validateToken,searchPropertyTitle);





module.exports = router
