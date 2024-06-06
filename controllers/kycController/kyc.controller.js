const asyncHandler = require("express-async-handler");
require('dotenv').config();
const axios = require('axios');
const SmileID = require('smile-identity-core')

const PARTNER_ID = process.env.SMILE_ID_PARTNER_ID;
const DEFAULT_CALLBACK = process.env.SMILE_ID_CALLBACK_URL;
const API_KEY = process.env.SMILE_ID_API_KEY;
const SID_SERVER = 1; // 0 for sandbox
const partner_params = {
    job_id: "04984209-fea7-4c1a-a5fd-976ad57cbdb6",
    user_id: "10e3b22c-905c-4f37-933a-dbca617151e7",
    job_type: 5,
};

const verifyIDNumber = asyncHandler(async (req, res) => {
    try {
        const id_number = req.body.id_number

        const id_info = {
            country: 'KE', // The country where ID document was issued
            id_type: 'NATIONAL_ID', // The ID document type
            id_number: id_number
        };
        const connection = new SmileID.IDApi(
            PARTNER_ID,
            API_KEY,
            SID_SERVER,
        )
        const result = await connection.submit_job(
            partner_params,
            id_info
        );
        console.info(result);
        res.status(200).send(result)
    } catch (error) {
        console.log('Error', error)
        res.status(400).send(error)
    }

})

const verifyKRANumber = asyncHandler(async (req, res) => {
    try {
        const kra_pin = req.body.kra_pin;

        const id_info = {
            country: 'KE', // The country where ID document was issued
            id_type: 'KRA_PIN', // The ID document type
            id_number: kra_pin,
            entered: true,
            postal_address: '',
            postal_code: '',
            citizenship: 'Kenyan'
        };
        const connection = new SmileID.IDApi(
            PARTNER_ID,
            API_KEY,
            SID_SERVER,
        )
        const result = await connection.submit_job(
            partner_params,
            id_info
        );
        console.info(result);
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

// Callback Endpoint
const smileIDCallback = asyncHandler(async (req, res) => {
    const smileid_response = req.body;
    console.log(smileid_response)

    res.status(200).json({ message: "Received" })

})


module.exports = { smileIDCallback, verifyIDNumber, verifyKRANumber }