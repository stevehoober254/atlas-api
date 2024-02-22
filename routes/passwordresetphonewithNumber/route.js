const express = require("express");
const router = express.Router();

const {sendPasswordResetPhoneNumber} = require("../../controllers/passwordResetWithPhoneNumber")


router.post("/resetpassword",sendPasswordResetPhoneNumber)



module.exports = router;