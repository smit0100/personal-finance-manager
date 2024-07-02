const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services');
const cron = require('node-cron');  

const { internalServerErrorResponse, customErrorResponse } = require('../utils/common/response-object');

class UserController {
    constructor() {
        this.UserService = new UserService();
    }

    signup = async (req, res) => {
        try {
            const { id,authToken,refreshToken} = await this.UserService.signup({
                email: req.body.email,
                password: req.body.password,
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 30
            })

            res.cookie('authToken', authToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 30
            })

           
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created user',
                err: {},
                data: id,
                sccuess: true
            })
        } catch (error) {
            console.log("🚀 ~ file: user-controller.js ~ line 26 ~ UserController ~ signup= ~ error", error);
            if (!error.StatusCode) {
                return internalServerErrorResponse(res, error.message);
            }

            return res.status(error.statusCode).json(
                customErrorResponse(error.message)
            )
        }
    }

    verify = async (req, res) => {
        try {
            const { email, otp } = req.body;
            const result = await this.UserService.verfiy({ email, otp });
            console.log(typeof result, result);
            if (result instanceof Error) {

                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: result.message,
                    err: {},
                    data: {},
                    success: false
                })
            }

            return res.status(StatusCodes.OK).json({
                message: 'Successfully verified user',
                err: {},
                data: {},
                success: true
            })
        } catch (error) {
            console.log("🚀 ~ file: user-controller.js ~ line 26 ~ UserController ~ verify= ~ error", error);

            if (!error.StatusCode) {
                return internalServerErrorResponse(res, error.message);
            }

            return res.status(error.statusCode).json(
                customErrorResponse(error.message)
            )
        }
    }

    signin = async (req, res) => {
        try {
            const result = await this.UserService.signin({
                
                email: req.body.email,
                password: req.body.password
            })
            
            console.log("🚀 ~ file: user-controller.js ~ line 26 ~ UserController ~ signin= ~ result", result);
            if (result instanceof Error) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: result.message,
                    err: {},
                    data: {},
                    success: false
                })
            }


            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 30
            })

            res.cookie('authToken', result.authToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 30
            })



            return res.status(StatusCodes.OK).json({
                message: 'Successfully signed in',
                err: {},
                data: result,
                success: true
            })
        } catch (error) {
            console.log("🚀 ~ file: user-controller.js ~ line 26 ~ UserController ~ signin= ~ error", error);

            if (!error.StatusCode) {
                return internalServerErrorResponse(res, error.message);
            }

            return res.status(error.statusCode).json(
                customErrorResponse(error.message)
            )

        }
    }

    deleteOTP = async () => {
        try {
            cron.schedule('*/15 * * * *', async () => {
                console.log('Running cron job to delete expired OTPs');
                this.UserService.deleteExpiredOTPs();

            })
        } catch (error) {
            
        }
    }

}

new UserController().deleteOTP();
module.exports = new UserController();