const express = require('express');
const { smileIDCallback, verifyIDNumber, verifyKRANumber } = require('../../controllers/kycController/kyc.controller');
const router = express.Router();

// Route to verify ID
router.post('/verify/id', verifyIDNumber)

// Route to verify KRA Pin
router.post('/verify/kra', verifyKRANumber)

// Route to process SmileID Callback
router.post('/callback', smileIDCallback)

module.exports = router;
