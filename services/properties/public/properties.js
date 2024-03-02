const EnlistProperty = require("../../../Models/EnlistProperty");

//public
const getAllUserEnlistedProperties = async (user_id) => {
    
    try {
        const allUserListedProperties = await EnlistProperty.find({ user: user_id }).exec();
        return allUserListedProperties;
    } catch (error) {
        console.error("Error retrieving enlisted properties:", error);
        return error;
    }
};

module.exports = {
    getAllUserEnlistedProperties
};
