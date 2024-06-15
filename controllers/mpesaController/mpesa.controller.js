const asyncHandler = require("express-async-handler");
require('dotenv').config();
const axios = require('axios');
const { parsePhoneNumber, getNumberFrom } = require('awesome-phonenumber');

const Transaction = require('../../Models/transaction');


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
    const { phoneNumber, amount, user_id } = req.body;

    const formattedNumber = formatPhoneNumber(phoneNumber)

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
        PhoneNumber: formattedNumber,
        CallBackURL: process.env.MPESA_CALLBACK_URL || "",
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
        // create a transaction record
        const { Body } = response.data;
        const { stkCallback } = Body;
        const { CheckoutRequestID } = stkCallback;
        await Transaction.create({
            user: user_id,
            transactionId: CheckoutRequestID,
            amount: amount,
            phoneNumber: phoneNumber
        })

        // return response
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
    const { ResultCode, ResultDesc, CallbackMetadata, CheckoutRequestID } = stkCallback;

    const metadata = CallbackMetadata.Item;
    const amount = metadata.find(item => item.Name === 'Amount').Value;
    const transactionId = metadata.find(item => item.Name === 'MpesaReceiptNumber').Value;
    const transaction = await Transaction.findOne({ transactionId: CheckoutRequestID });


    if (ResultCode === 0) {
        try {
            // update transaction
            if (transaction) {
                transaction.status = 'success';
                transaction.mpesaReceiptID = transactionId;
                await transaction.save();
                const userWallet = await Wallet.findOne({ user: transaction.user });
                if (userWallet) {
                    userWallet.balance += amount;
                    await userWallet.save();
                } else {
                    console.log('Wallet not found for the user');
                }
            } else {
                console.log('Transaction not found');
            }
        } catch (error) {
            console.error(error)
            res.status(200)
        }
    }
    if (ResultCode === 1) {
        console.log('Insufficient funds for the transaction.');
        if (transaction) {
            transaction.status = 'failed';
            transaction.note = "Insufficient funds"
            await transaction.save();
        }
    }
    if (ResultCode === 1032) {
        console.log('Canceled by user.');
        if (transaction) {
            transaction.status = 'failed';
            transaction.note = "Canceled"
            await transaction.save();
        }
    }
    if (transaction) {
        transaction.status = 'failed';
        transaction.note = "Timed out"
        await transaction.save();
    }
    res.status(200)
});


// format phone number
function formatPhoneNumber(phoneNumber) {
    // Remove any white spaces
    phoneNumber = phoneNumber.replace(/\s+/g, '');

    if (phoneNumber.startsWith('+254')) {
        // Remove the '+' sign
        phoneNumber = phoneNumber.substring(1);
    } else if (phoneNumber.startsWith('254')) {
        // No need to modify, already starts with 254
    } else if (phoneNumber.startsWith('07')) {
        // Replace leading 0 with 254
        phoneNumber = '254' + phoneNumber.substring(1);
    } else {
        throw new Error('Invalid Kenyan phone number format');
    }

    return phoneNumber;
}


module.exports = { getMpesaToken, initiateSTKPush, mpesaCallback };
