const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

otpSchema.pre('save', async function (next) {
    this.expiresAt = new Date(new Date().getTime() + 5 * 60000);
    next();
})

otpSchema.methods.isExpired = function () {
    return new Date() > this.expiresAt;
}

otpSchema.methods.isMatch = function (otp) {
    return this.otp === otp;
}

otpSchema.methods.isUserIdMatch = function (userId) {
    return this.userId.toString() === userId.toString();
}



const Otp = mongoose.model('Otp', otpSchema);