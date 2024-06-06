const asyncHandler = require("express-async-handler");
require('dotenv').config();
const axios = require('axios');
const SmileID = require('smile-identity-core')

const PARTNER_ID = process.env.SMILE_ID_PARTNER_ID;
const DEFAULT_CALLBACK = process.env.SMILE_ID_CALLBACK_URL;
const API_KEY = process.env.SMILE_ID_API_KEY;
const SID_SERVER = 1; // 0 for sandbox


const verifyIDNumber = asyncHandler(async (req, res) => {
    try {
        const id_number = req.body.id_number
        const partner_params = {
            job_id: "04984209-fea7-4c1a-a5fd-976ad57cbdb6",
            user_id: "10e3b22c-905c-4f37-933a-dbca617151e7",
            job_type: 5,
            id_number: id_number
        };
        const id_info = {
            country: 'KE', // The country where ID document was issued
            id_type: 'NATIONAL_ID', // The ID document type
            id_number: id_number
        };
        const options = {
            // Set to true if you want to get the job result in sync (in addition to the result been sent to
            // your callback). If set to false, result is sent to callback url only.
            return_job_status: true,
            // Set to true to return results of all jobs you have ran for the user in addition to current job
            // result. You must set return_job_status to true to use this flag.
            return_history: false,
            // Set to true to receive selfie and liveness images you uploaded. You must set return_job_status
            // to true to use this flag.
            signature: true,
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

// Callback Endpoint
const smileIDCallback = asyncHandler(async (req, res) => {
    const smileid_response = req.body;
    console.log(smileid_response)

    res.status(200).json({ message: "Received" })

})

module.exports = { smileIDCallback, verifyIDNumber }