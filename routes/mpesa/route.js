const express = require('express');
const router = express.Router();
const { getMpesaToken, initiateSTKPush } = require('../../controllers/mpesaController/mpesa.controller');

// Route to get Mpesa Access Token
router.get('/token', getMpesaToken);

// Route to initiate Mpesa STK Push
router.post('/stkpush', initiateSTKPush);

module.exports = router;
