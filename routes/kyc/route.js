const express = require('express');
const { smileIDCallback, verifyIDNumber } = require('../../controllers/kycController/kyc.controller');
const router = express.Router();

// Route to verify ID
router.post('/verify/id', verifyIDNumber)

// Route to process SmileID Callback
router.post('/callback', smileIDCallback)

module.exports = router;
