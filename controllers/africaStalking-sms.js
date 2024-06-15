const asyncHandler = require("express-async-handler");
const { generateOTPCode, verifyOTPCode } = require("../otp/otpWrapper");
const africastalking = require("africastalking");
const { sendSMS } = require("../sms/africaStalkingGateWays");
const { getISOPhoneNo } = require("../utils/phoneNumberValidate")
require('dotenv').config();
const { sendEmailUsingTemplate } = require("../utils/sendgrid");

const sendOTP = asyncHandler(async (req, res, next) => {
    const { phoneNumber, email_address } = req.body;
    console.log(phoneNumber, email_address)
    const otpCode = generateOTPCode();

    //validate phone number

    //const isoPhoneNo = getISOPhoneNo(phoneNumber);
    //console.log(isoPhoneNo)
    const smsOptions = {
        to: [`+254${phoneNumber}`],
        message: `Welcome to Atlas your verification code is ${otpCode}. This code expires in 2 minutes`
    };
    console.log('SMS', smsOptions);

    if (email_address) {
        let otp_email_template_id = process.env.SENDGRID_OTP_TEMPLATE_ID;
        let dynamicTemplateData = {
            otp_code: otpCode
        }
        sendEmailUsingTemplate(email_address, otp_email_template_id, dynamicTemplateData)
            .then(response => {
                console.log(response);
                res.status(200).json({ success: true, message: 'OTP code sent' })
            }).catch((err) => {
                console.error(err);
                res.status(200).json({ success: false, message: 'Unable to sent OTP' })

            });
    }
    if (phoneNumber) {
        sendSMS(smsOptions).then((response) => {
            console.log('African stalking', response)
            res.status(200).json({ success: true, message: 'OTP code sent' })
        }).catch((err) => {
            console.error(err);
            res.status(200).json({ success: false, message: 'Unable to sent OTP' })

        });
    }
    res.status(400)
})

const verifyOTP = asyncHandler(async (req, res, next) => {
    const { otp } = req.body;
    let verifyMsg;
    let isOTPValid;

    if (verifyOTPCode(otp)) {
        verifyMsg = 'OTP code Valid';
        isOTPValid = true;
    } else {
        verifyMsg = 'OTP code inValid';
        isOTPValid = false;
    }

    res.status(200).json({ isOTPCodeValid: isOTPValid, verificationMsg: verifyMsg });


})

module.exports = {
    sendOTP,
    verifyOTP
}