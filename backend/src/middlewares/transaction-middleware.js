const Transcation  = require('../models/transaction');

function validateRequestBody(req,res,next) {
    
        const bodyKeys = Object.keys(req.body);
        const schemaKeys = Object.keys(Transcation.schema.paths);

        const invalidKeys = bodyKeys.filter(key => !schemaKeys.includes(key));

        if (invalidKeys.length > 0) {
           
            invalidKeys.forEach(key => delete req.body[key]);
        }
        
        let data = {};

        for (let key in req.body) {
            if (!req.body[key]) {
                delete req.body[key];
            }
        }
        next();
    
}

module.exports = {
    validateRequestBody
}