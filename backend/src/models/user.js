const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET, JWT_EXPIRY, jWT_REFERESH_EXPIRES_IN, REFRESH_TOKEN_SECRET } = require('../config/serverConfig');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
    },
    otpExpired: {
        type: Date
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token =  jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return token;
}

console.log('jtw refresh expirds in ', jWT_REFERESH_EXPIRES_IN);

userSchema.methods.generateRefreshToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: jWT_REFERESH_EXPIRES_IN });
   
    return token;

}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User
        .findOne
        ({ email });
    if (!user) {
        throw new Error("Unable to login");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login");
    }
    return user;
}

userSchema.methods.comparePassword = async function (password) {
    try {
        console.log('password ', password);
        console.log('this.password ', this.password);
        const res = await bcrypt.compare(password, this.password);
        return res;
    } catch (error) {
        throw new Error(error);
    }
};




// userSchema.pre('save', async function (next) {
//     const user = this;
//     const SALT =  bcrypt.genSaltSync(10);
//     console.log('user.password' , user.password);
//     const encryptPassword = bcrypt.hashSync(user.password, SALT);

//     user.password = encryptPassword;
//     next();
// })

const User = mongoose.model('User', userSchema);

module.exports = User;