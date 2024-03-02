const express = require("express");
const router = express.Router();

const {validateToken} = require("../../../middleWare/validateTokenHandler")
const {getAllUserProperty} = require("../../../controllers/useController/propertiesController")

router.get("/userProperties",validateToken,getAllUserProperty);


module.exports = router
