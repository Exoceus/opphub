const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const waitingUserModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
});


const waitingUser = mongoose.model('waitingUserModel', waitingUserModel);

module.exports = waitingUser;