const Transaction = require('../../Models/transaction');
const asyncHandler = require('express-async-handler');

const getUserTransactions = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    try {
        const transactions = await Transaction.find({ user: user_id })
            .sort({ transactionDate: -1 }); // Sorting by transactionDate in descending order

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to retrieve transactions'
        });
    }
});

module.exports = { getUserTransactions };
