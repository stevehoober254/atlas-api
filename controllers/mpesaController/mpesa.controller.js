const asyncHandler = require("express-async-handler");
require('dotenv').config();
const axios = require('axios');

const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORT_CODE, MPESA_PASSKEY } = process.env;

// Function to get Mpesa Access Token
const getMpesaToken = asyncHandler(async (req, res) => {
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = 'Basic ' + Buffer.from(MPESA_CONSUMER_KEY + ':' + MPESA_CONSUMER_SECRET).toString('base64');

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': auth
            }
        });
        res.status(200).json({ accessToken: response.data.access_token });
    } catch (error) {
        res.status(error.response.status).json({ message: error.message });
    }
});

// Function to initiate Mpesa STK Push
const initiateSTKPush = asyncHandler(async (req, res) => {
    const { phoneNumber, amount } = req.body;
    const accessToken = req.headers.authorization.split(" ")[1]; // Uses Bearer token
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    // const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, -5);
    const timestamp = new Date().toISOString().slice(-24).replace(/\D/g, "").slice(0, 14);
    const password = Buffer.from(MPESA_SHORT_CODE + MPESA_PASSKEY + timestamp).toString('base64');

    const data = {
        BusinessShortCode: MPESA_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: MPESA_SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: 'https://yourdomain.com/callback',
        AccountReference: 'Atlas KE',
        TransactionDesc: 'Payment of Atlas KE Account'
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json({ message: 'STK Push initiated successfully', response: response.data });
    } catch (error) {
        console.log(error)
        res.status(error.response.status).json({ message: error.message });
    }
});


// Mpesa callback 
const mpesaCallback = asyncHandler(async (req, res) => {
    const { Body } = req.body;
    const { stkCallback } = Body;
    const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    if (ResultCode === 0) {
        const metadata = CallbackMetadata.Item;
        const amount = metadata.find(item => item.Name === 'Amount').Value;
        const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber').Value;
        const transactionId = metadata.find(item => item.Name === 'MpesaReceiptNumber').Value;

        try {
            // Assuming User model has a method to update wallet and it uses phoneNumber to identify the user
            const user = await User.findOne({ phoneNumber });
            if (user) {
                user.wallet += amount;
                await user.save();
                res.status(200).json({ message: 'Wallet updated successfully', transactionId });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user wallet', error: error.message });
        }
    } else {
        res.status(400).json({ message: `Transaction failed with message: ${ResultDesc}` });
    }
});


module.exports = { getMpesaToken, initiateSTKPush, mpesaCallback };
