const express = require("express");
//const { sendOTP,verifyOTP } = require("../../controllers/twilio-sms");
const {sendOTP,verifyOTP} = require("../../controllers/africaStalking-sms")
const router = express.Router();


router.post('/send-otp',sendOTP)

router.post('/verify-otp',verifyOTP)

module.exports = router;