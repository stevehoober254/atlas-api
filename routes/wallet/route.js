const express = require('express');
const router = express.Router();
const { getUserWallet } = require('../../controllers/wallet/wallet.controller');

// Route to get user wallet
router.get('/user/:user_id', getUserWallet);

module.exports = router;
