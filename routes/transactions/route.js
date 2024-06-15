const express = require('express');
const router = express.Router();
const { getUserTransactions } = require('../../controllers/transactionsController/transaction.controller');

// Route to get user transactions
router.get('/user/:user_id', getUserTransactions);

module.exports = router;
