const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = require('../../config/serverConfig');

const sendEmail = async (to, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: message,
        };

        const res = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + res.response);
        return res;

    } catch (error) {
        console.log(error);
        throw error;
    }
};


module.exports = {
    sendEmail
}