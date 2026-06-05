import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },

    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    },

    image: {
        type: String,
        default: "/images/default.png"
    }


})

const User = mongoose.model('User', userSchema);

export default User;
