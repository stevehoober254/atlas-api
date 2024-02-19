const express = require("express");
const router = express.Router();
const User = require("../../Models/User")
const {sendPasswordResetEmail,receiveNewPassword} = require("../../controllers/passwordResetEmail")


router.post("/sendEmail",sendPasswordResetEmail)

router.post("/receive_new_password/:userId/:token",receiveNewPassword)

module.exports = router;