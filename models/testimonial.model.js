const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    oppID: {
        type: String,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review_text: {
        type: String,
    },
    verified:{
        type: Boolean
    }
}, 
{
    timestamps: true,
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;