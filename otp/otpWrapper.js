const otplib = require("otplib")

const secret = process.env.OTPLIBSECRET_KEY //"YesyouYeyYouYesYou" //otplib.authenticator.generateSecret();

otplib.authenticator.options = {
    step: 120,
    window: 1
};


const generateOTPCode = () => {
    return otplib.authenticator.generate(secret);
}

const verifyOTPCode = (token) => {
    return otplib.authenticator.check(token, secret);
}

const getOTPtimeUsed = () => {
    return otplib.authenticator.timeUsed();
}

const getOTPtimeRemaining = () => {
    return otplib.authenticator.timeRemaining();
}

const isOTPCodeExpired = () => {
    if (getOTPtimeRemaining() === 0) {
        return true
    }
    return false
}
module.exports = {
    generateOTPCode,
    getOTPtimeRemaining,
    getOTPtimeUsed,
    isOTPCodeExpired,
    verifyOTPCode,
}