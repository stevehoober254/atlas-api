const asyncHandler = require("express-async-handler")
const { getUserbyPhoneNumber, countTotalUsers } = require("../../../services/user/userServices")
const { userEnlistProperty, getAllEnlistedProperties, countTotalEnlistedProperties, verifyProperty, cancelPropertyVerification } = require("../../../services/properties/admin/enlistPropertyServices")
const { getAllRegistryEnlistedProperties } = require("../../../services/properties/registrar/registry")
const { handleUploads, uploadImage } = require("../../../upload/uploadDocuments")
const { convertBase64 } = require("../../../hooks/fileupload")
const { getAllPropertyTransfered, getTotalTransfers } = require("../../../services/transfersProperty/admin/transfers")
const { getTotalEncumbrances, getAllEncumbrances } = require("../../../services/properties/encumbrance/encumbrance")
const { sendEmailUsingTemplate } = require("../../../utils/sendgrid")

const Profile = require("../../../Models/Profile")

//view all enlisted property

const getAllPropertiesEnlisted = asyncHandler(async (req, res) => {

    try {
        const allProperties = await getAllEnlistedProperties();

        if (!allProperties) {
            return res.status(401).json("no property enlisted")
        }

        return res.status(201).json(allProperties)


    } catch (err) {
        console.log(err)
        return res.status(401).json("Failed to fetch properties")

    }
})


//get All Transfered Properties

const getTransfers = asyncHandler(async (req, res) => {
    try {
        const transferProperty = await getAllPropertyTransfered();


        if (!transferProperty || transferProperty.length == 0) {
            return res.status(401).json({ message: "no property yet " })
        }
        return res.status(200).json(transferProperty);


    } catch (error) {
        return res.status(500).json({ message: "try another time " })

    }
})

//count total number of properties/tranfers
const countTotalProperties = asyncHandler(async (req, res) => {

    try {
        const totalNumberOfProperties = await countTotalEnlistedProperties()
        const totalNumberOfTranfers = await getTotalTransfers()
        const totalNumberOfUsers = await countTotalUsers()
        const totalNumberOfEncumbrance = await getTotalEncumbrances()
        return res.status(200).json({ total: totalNumberOfProperties, transfers: totalNumberOfTranfers, users: totalNumberOfUsers, encumbrance: totalNumberOfEncumbrance });

    } catch (error) {

    }


})

//get all encumbrances
const getEncumbrances = asyncHandler(async (req, res) => {
    try {

        const allEncumbrances = await getAllEncumbrances();

        return res.status(200).json(allEncumbrances);

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });

    }

});

const handleVerifyProperty = asyncHandler(async (req, res) => {
    try {
        const { property_id } = req.body

        const property = await verifyProperty(property_id);
        console.log('Updated Property', property)
        if (property) {
            const user = property.user;
            const profile = await Profile.findOne({ user })
            if (profile) {
                const email = profile.email;
                let template_id = process.env.SENDGRID_PROPERTY_VERIFIED_TEMPLATE_ID;
                let dynamicTemplateData = {
                    property_image: property.propertyImage
                }
                await sendEmailUsingTemplate(email, template_id, dynamicTemplateData)
            }
        }

        return res.status(200).json(property);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }

});

const handleCancelPropertyVerification = asyncHandler(async (req, res) => {
    try {
        const { property_id } = req.body

        const property = await cancelPropertyVerification(property_id);
        console.log('Updated Property', property)

        return res.status(200).json(property);

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
});



module.exports = {

    getAllPropertiesEnlisted,
    getTransfers,
    countTotalProperties,
    getEncumbrances,
    handleVerifyProperty,
    handleCancelPropertyVerification

}