const Wallet = require('../../Models/Wallet');
const asyncHandler = require('express-async-handler');

const getUserWallet = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    try {
        const wallet = await Wallet.findOne({ user: user_id });

        if (!wallet) {
            return res.status(404).json({
                success: false,
                message: 'Wallet not found'
            });
        }

        res.status(200).json({
            success: true,
            data: wallet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to retrieve wallet'
        });
    }
});

module.exports = { getUserWallet };
