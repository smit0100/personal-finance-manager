const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');


const { internalServerErrorResponse } = require('../utils/common/response-object');
const { JWT_SECRET } = require('../config/serverConfig');
const { UserRepository } = require('../repositories');
const serverConfig = require('../config/serverConfig');

const userRepository = new UserRepository();

const validateSignupRequest = async (req, res, next) => {

    if (!req.body.email) {
        return res.status(StatusCodes.BAD_REQUEST).json(internalServerErrorResponse('Email is required'));
    }

    if (!req.body.password) {
        return res.status(StatusCodes.BAD_REQUEST).json(internalServerErrorResponse('Password is required'));
    }

    if (!req.body.confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json(internalServerErrorResponse('Confirm Password is required'));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json(internalServerErrorResponse('Password and Confirm Password must be same'));
    }

    next();
}

const validateSinginRequest = async (req, res, next) => {
    console.log("🚀 ~ file: auth-middleware.js ~ line 33 ~ validateSinginRequest ~ req", req.body)
    if (!req.body.email) {
        return res.status(StatusCodes.BAD_REQUEST).json(internalServerErrorResponse('Email is required'));
    }

    if (!req.body.password) {
        return res.status(StatusCodes.BAD_REQUEST).json(internalServerErrorResponse('Password is required'));
    }

    next();
}

const isUserAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json(internalServerErrorResponse('Token is required'));
        }

        const response = jwt.verify(token, JWT_SECRET);

        if (!response) {
            return res.status(StatusCodes.UNAUTHORIZED).json(internalServerErrorResponse('Invalid Token'));
        }

        const userRepository = new UserRepository();
        const user = await userRepository.getUserById(response.id);
        req.user = user.id;
        next();
    } catch (error) {
        console.log("🚀 ~ isUserAuthenticated ~ error:", error)

        if (error.name == 'JsonWebTokenError') {
            return res.status(StatusCodes.UNAUTHORIZED).json(internalServerErrorResponse('Invalid Token'));
        }

        if (error.name == 'TokenExpiredError') {
            return res.status(StatusCodes.UNAUTHORIZED).json(internalServerErrorResponse('Token Expired'));
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse('Internal Server Error'));

    }
}


const validateRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.headers['x-refresh-token'] || req.body.refreshToken || req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json(internalServerErrorResponse('Refresh Token is required'));
        }

        const decodedToken = jwt.verify(refreshToken, serverConfig.REFRESH_TOKEN_SECRET);

        const user = await userRepository.getUserById(decodedToken?.id);

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json(internalServerErrorResponse('Invalid Refresh Token'));
        }


    } catch (error) {

    }
}

module.exports = {
    validateSignupRequest,
    validateSinginRequest,
    isUserAuthenticated
}