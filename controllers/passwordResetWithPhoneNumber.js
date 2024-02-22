const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const asyncHandler = require("express-async-handler");

const sendPasswordResetPhoneNumber = asyncHandler(async (req, res) => {
    const { newPassword, phoneNumber } = req.body;

    try {
        const user = await User.findOne({ phoneNumber }).exec();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Hash the new password
        const hash = await bcrypt.hash(newPassword, 5);

        // Update the user's password
        await User.findByIdAndUpdate(user._id, { password: hash });

        return res.status(202).json("Password changed accepted");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update password" });
    }
});

module.exports = {
    sendPasswordResetPhoneNumber
};
