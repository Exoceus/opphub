const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ambassadorSchema = new Schema({
    verified: {
        type: Boolean
    },
    ambassador_name: {
        type: String,
        trim: true,
        required: true
    },
    profile_pic: {
        type: String,
        trim: true,
    },
    UID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Ambassador = mongoose.model('Ambassador', ambassadorSchema);

module.exports = Ambassador;