const express = require("express");
const router = express.Router();
const User = require("../../Models/User")


router.post("/user/:email")

router.post("/receive_new_password/:userId/:token")

module.exports = router;