const Profile = require('../../Models/Profile');
const Wallet = require('../../Models/Wallet'); // Assuming Wallet model exists

// Get wallet balance by user account
const getWalletBalance = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const wallet = await Wallet.findOne({ owner: userId });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        res.status(200).json({ balance: wallet.balance });
    } catch (error) {
        console.error("Failed to get wallet balance:", error);
        res.status(500).json({ message: "Failed to get wallet balance" });
    }
};

// Update wallet balance
const updateWalletBalance = async (req, res) => {
    try {
        const { userId } = req.params;
        const { newBalance } = req.body;

        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const wallet = await Wallet.findOneAndUpdate(
            { owner: userId },
            { $set: { balance: newBalance } },
            { new: true }
        );

        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        res.status(200).json({ message: "Wallet balance updated successfully", balance: wallet.balance });
    } catch (error) {
        console.error("Failed to update wallet balance:", error);
        res.status(500).json({ message: "Failed to update wallet balance" });
    }
};


module.exports = { getWalletBalance, updateWalletBalance }