const asyncHandler = require("express-async-handler")
require('dotenv').config();
const {TWILIO_AUTH_TOKEN,TWILIO_SERVICE_ID,TWILIO_ACCOUNT_SID} = process.env
const  client  = require("twilio")(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{
    lazyLoading:true
})

/**
 * sendOTP
 * 
 */
const sendOTP = asyncHandler(async(req,res,next)=>{
    const {countryCode,phoneNumber} = req.body;
  try{
    const otpResponse = await client.verify.v2.services(TWILIO_SERVICE_ID).verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
    });
    res.status(200).send(`OTP send successfully!: ${JSON.stringify(otpResponse)}`)

  }catch(error){
    res.status(error?.status || 400).send(error?.message || 'something Went wrong')
  }

})


/**
 * Verify OTP
 * 
 */
const verifyOTP = asyncHandler(async(req,res,next)=>{
    const {countryCode,phoneNumber,otp} = req.body;
  try{
    const verificationResponse = await client.verify.v2.services(TWILIO_SERVICE_ID).verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
        channel: "sms"
    });
    res.status(200).send(`OTP send successfully!: ${JSON.stringify(verificationResponse)}`)

  }catch(error){
    res.status(error?.status || 400).send(error?.message || 'something Went wrong')
  }

})

module.exports = {sendOTP,verifyOTP}