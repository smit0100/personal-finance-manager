const crypto = require('crypto');
const nodemailer = require('nodemailer');


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}




module.exports = {
    generateOTP,
};