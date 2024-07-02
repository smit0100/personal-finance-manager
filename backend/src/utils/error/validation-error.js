const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
    constructor(error) {
        super();
        this.name = 'ValidationError';
        this.message = error.message;
        this.explanation = error.explanation;
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError;