const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostSchema = new Schema({
    verified: {
        type: Boolean
    },
    host_name: {
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
    host_type: [{
        type: String
    }],
    description: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    temp_region: {
        type: String,
    },
    sector: [{
        type: String,
    }],
    website: {
        type: String
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    },
}, {
    timestamps: true,
});

hostSchema.index({
    host_name: 'text',
    description: 'text'
});

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;