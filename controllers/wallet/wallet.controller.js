const Wallet = require('../../Models/Wallet');
const asyncHandler = require('express-async-handler');

const getUserWallet = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    console.log('USER', user_id)

    try {
        const wallet = await Wallet.findOne({ user: user_id });

        if (!wallet) {
            const newWallet = new Wallet({
                user: user_id,
                balance: 0
            });

            await newWallet.save();

            return res.status(201).json({
                success: true,
                message: 'Wallet created successfully',
                data: newWallet
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
