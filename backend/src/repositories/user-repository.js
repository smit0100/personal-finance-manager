const User = require('../models/user')
const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async deleteExpiredOTP() {
        return User.deleteMany({ otpExpired: { $lt: new Date(Date.now()) } });
    }
}

module.exports = UserRepository;