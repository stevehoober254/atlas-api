const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^\+?1?\s*[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

 const isValidEmail = (email) => {
    return emailRegex.test(email);
  };
   const isValidPhoneNumber = (phoneNumber) => {
  return phoneNumberRegex.test(phoneNumber);
}; 

module.exports ={isValidEmail,isValidPhoneNumber}