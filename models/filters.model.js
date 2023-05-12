const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const filterModel = new Schema({
    search: {
        type: String
    },
    target_demo: {
        type: String
    },
    sector: {
        type: String
    },
    position_type: {
        type: String
    },
    location: {
        type: String
    }
}, {
    timestamps: true,
});


const filters = mongoose.model('filterModel', filterModel);

module.exports = filters;