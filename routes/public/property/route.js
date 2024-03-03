const express = require("express");
const router = express.Router();

const {validateToken} = require("../../../middleWare/validateTokenHandler")
const {getAllUserProperty,verifyForProcessing} = require("../../../controllers/useController/propertiesController")

router.get("/userProperties",validateToken,getAllUserProperty);

router.post("/verify",validateToken,verifyForProcessing)


module.exports = router
