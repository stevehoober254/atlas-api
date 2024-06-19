const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailUsingTemplate = async (to, templateId, dynamicTemplateData = {}) => {
    const msg = {
        to,
        from: 'no-reply@atlas-ke.net', // Use your verified SendGrid email
        templateId,
        dynamicTemplateData,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully using dynamic template');
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error('Error details:', error.response.body);
        }
    }
};


module.exports = { sendEmailUsingTemplate };

