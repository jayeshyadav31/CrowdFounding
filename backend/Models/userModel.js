import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is a mandatory field"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number
    },
    age: {
        type: Number
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        console.error('Error in hashing password:', error);
        return next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error('Error in verifying password:', error);
        throw error;
    }
};

userSchema.methods.generateAccessToken = function () {
    // console.log(process.env.JWT_SECRET);
    const secret= jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });
    // console.log(secret);
    return secret;
};

const User = mongoose.model('User', userSchema);
export default User;
