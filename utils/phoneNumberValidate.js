
const PhoneNumber = require("awesome-phonenumber");

const getISOPhoneNo = (number) => {
    const phoneNumber = new PhoneNumber( number, 'KE' );
    return phoneNumber.getNumber( 'e164' );
};

module.exports ={
    getISOPhoneNo
}