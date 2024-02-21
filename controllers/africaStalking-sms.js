const asyncHandler = require("express-async-handler");
const { generateOTPCode, verifyOTPCode } = require("../otp/otpWrapper");
const africastalking = require("africastalking");
const { sendSMS } = require("../sms/africaStalkingGateWays");
const {getISOPhoneNo} = require("../utils/phoneNumberValidate")
require('dotenv').config();

const sendOTP = asyncHandler(async(req,res,next)=>{
    const {countryCode,phoneNumber} = req.body;
    const otpCode = generateOTPCode();

    //validate phone number

 //const isoPhoneNo = getISOPhoneNo(phoneNumber);
 //console.log(isoPhoneNo)
    const smsOptions ={
        to: [`+254${phoneNumber}`],
        message: `Welcome to Atlas your verification code is ${otpCode}. This code expires in 1 minutes`
    };

    console.log(smsOptions);

 sendSMS(smsOptions).then((response)=>{
    res.status(200).json({success: true, message: 'OTP code sent'})
 }).catch((err)=>{
    console.log(err);
    res.status(200).json({success: false, message: 'Unable to sent OTP'})
        
 });

})

const verifyOTP = asyncHandler(async(req,res,next)=>{
    const {otp} = req.body;
    let verifyMsg;
    let isOTPValid;

    if(verifyOTPCode(otp)){
        verifyMsg = 'OTP code Valid';
        isOTPValid = true;
    }else{
        verifyMsg = 'OTP code inValid';
        isOTPValid = false;
    }

    res.status(200).json({isOTPCodeValid:isOTPValid,verificationMsg:verifyMsg});


})

module.exports ={
    sendOTP,
    verifyOTP
}