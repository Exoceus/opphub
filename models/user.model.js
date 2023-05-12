const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    UID: {
        type: String,
        required: true
    },
    starred_opps: [
        {
            type: String
        }
    ],
    bio: {
        type: String,
    },
    tagline:{
        type: String,
    },
    profile_img: {
        type: String,
    },
    banner_img: {
        type: String,
    },
    instagram: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    twitter: {
        type: String,
    },
    website: {
        type: String,
    },
}, {
    timestamps: true,
});

const RegUser = mongoose.model('RegUser', RegUserSchema);

module.exports = RegUser;