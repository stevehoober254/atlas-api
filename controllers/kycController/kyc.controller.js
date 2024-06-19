const asyncHandler = require("express-async-handler");
require('dotenv').config();
const axios = require('axios');
const SmileID = require('smile-identity-core');
const User = require("../../Models/User");
const Profile = require("../../Models/Profile");
const { sendEmailUsingTemplate } = require("../../utils/sendgrid");

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

function compareFullNames(name1, name2) {
    // Convert both names to lowercase and split them into word sets
    const name1Set = new Set(name1.toLowerCase().split(/\s+/));
    const name2Set = new Set(name2.toLowerCase().split(/\s+/));

    // Check if all words in one set are present in the other (ignoring order)
    return name1Set.size === name2Set.size && [...name1Set].every(word => name2Set.has(word));
}

// verify user based on full name and id number
const verifyUserByNameAndID = async (user_id, fullName, idNumber, email) => {
    const id_info = {
        country: 'KE', // The country where ID document was issued
        id_type: 'NATIONAL_ID', // The ID document type
        id_number: idNumber
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
    const ResultCode = result.ResultCode;
    if (ResultCode === "1012") {
        const IDNames = result.FullName;

        let failed_email_template_id = process.env.SENDGRID_VERIFICATION_FAILED_TEMPLATE_ID;
        let success_email_template_id = process.env.SENDGRID_VERIFICATION_SUCCESS_TEMPLATE_ID;

        if (compareFullNames(fullName, IDNames)) {
            console.log('user to update', user_id)
            const user = await Profile.findOneAndUpdate(
                { user: user_id },
                {
                    $set: {
                        status: "verified",
                    }
                }
            );
            console.log(user);
            // send verification success email
            sendEmailUsingTemplate(email, success_email_template_id)
                .then(response => {
                    console.log(response);
                }).catch((err) => {
                    console.error(err);
                });
        } else {
            // send verification fail email
            sendEmailUsingTemplate(email, failed_email_template_id)
                .then(response => {
                    console.log(response);
                }).catch((err) => {
                    console.error(err);
                });
        }
    }
}


module.exports = { smileIDCallback, verifyIDNumber, verifyKRANumber, verifyUserByNameAndID }