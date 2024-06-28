const express = require('express');
const router = express.Router();
const { getMpesaToken, initiateSTKPush, mpesaCallback, confirmPayment } = require('../../controllers/mpesaController/mpesa.controller');

// Route to get Mpesa Access Token
router.get('/token', getMpesaToken);

// Route to initiate Mpesa STK Push
router.post('/stkpush', initiateSTKPush);

// Route to process Mpesa Callback
router.post('/callback', mpesaCallback)

// Route to confirm mpesa payment
router.post('/confirm', confirmPayment)

module.exports = router;
