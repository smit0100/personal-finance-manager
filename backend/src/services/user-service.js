const { StatusCodes } = require('http-status-codes');
const { generateOTP } = require('../utils/common/otp');
const { sendEmail } = require('../utils/common/sendEmail')
const bcrypt = require('bcrypt');

const { UserRepository } = require('../repositories');
const ValidationError = require('../utils/error/validation-error');
class UserServices {
    constructor() {
        this.userRepository = new UserRepository();
    }

    signup = async (data) => {
        try {
             
            console.log("🚀 ~ file: user-service.js ~ line 26 ~ UserServices ~ signup= ~ data", data)

            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);

            const user = await this.userRepository.create(data);
            const authToken = await user.generateAuthToken();
            const refreshToken = await user.generateRefreshToken();

            const otp = generateOTP();
            user.otp = otp;

            user.otpExpired = new Date(Date.now() + 5 * 60 * 1000);
            
            const res = await sendEmail(user.email, 'OTP for account verification', `Your OTP is ${otp}`);
            console.log('Email sent: ' + res.response);
            await user.save();
            console.log(user);
            return {
                id: res.response._id,
                authToken,
                refreshToken
            };
        } catch (error) {
            console.log("🚀 ~ file: user-service.js ~ line 70 ~ UserServices ~ signup= ~ error", error);
            if (error.name == 'ValidationError') {
                throw new ValidationError({
                    errors: error.errors,
                    message: error.message
                })
            }
            throw error;
        }
    }

    verfiy = async ({ email, otp }) => {

        try {
            const user = await this.userRepository.findOne({ email });
            if (!user) {
                return new Error('User not found');
            }

            if (user.otp != otp) {
                console.log('error');
                return new Error('Invalid OTP');
            }

            if (user.otpExpired < new Date(Date.now())) {
                return new Error('OTP expired');
            }

            user.isVerified = true;

            user.otp = undefined
            user.otpExpired = undefined
            await user.save();


            return user;
        } catch (error) {   
            console.log("🚀 ~ file: user-service.js ~ line 70 ~ UserServices ~ verfiy= ~ error", error)
            throw error;
            return error;
        } 
    }

    signin = async ({ email, password }) => {
        try {
            const user = await this.userRepository.findOne({ email });
            if (!user) {
                return new Error('User not found');
            }
           
            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return new Error('Invalid password');
            }

            if (!user.isVerified) {
                return new Error('User not verified');
            }
            
            console.log('isMatch', isMatch);
            const authToken = await user.generateAuthToken();
            const refreshToken = await user.generateRefreshToken();

            return {
                user,
                authToken,
                refreshToken
            }


        } catch (error) {
            if (error.name == 'ValidationError') {
                throw new ValidationError({
                    errors: error.errors,
                    message: error.message
                })
            }
            throw error;
        }
    }

     deleteExpiredOTPs = async () => {
         try {
             const now = Date.now();
             console.log('deleted otp', now);
            const result = await this.userRepository.deleteExpiredOTP()
             console.log(`Deleted ${result} expired OTPs`);    
             console.log(result);
         } catch (error) {
             
            console.log("🚀 ~ file: user-service.js ~ line 70 ~ UserServices ~ verfiy= ~ error", error)
        }
    }
}

module.exports = UserServices;