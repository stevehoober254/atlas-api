
require('dotenv').config();
const options = {
    apiKey: process.env.AFRICA_STALKING_API,
    username: "Atlas"
}
const AfricaStalking = require("africastalking")(options);

const sms = AfricaStalking.SMS;

const sendSMS = async (data) => {
    return await sms.send(data);
}

const reSendSms = async (data) => {
    return await sms.send(data)
}

module.exports = {
    sendSMS,
    reSendSms
}
