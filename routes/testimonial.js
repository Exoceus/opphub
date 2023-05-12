const router = require('express').Router();
const path = require('path');
const url = require('url');
const Testimonial = require('../models/testimonial.model');
let Testimonials = require('../models/testimonial.model');

router.get('/all', (req, res) => {
    Testimonial.find()
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/id', (req, res) => {
    Testimonial.findOneByID({ id: req.query.id})
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/user', (req, res) => {
    Testimonial.find({userID: req.query.userID})
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/opp', (req, res) => {
    Testimonial.find({oppID: req.query.oppID})
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/new', (req, res) => {
    var userID = req.body.userID;
    var oppID = req.body.oppID;
    var affiliation = req.body.affiliation;
    var rating = req.body.rating;
    var review_text = req.body.review_text;
    var verified = req.body.verified;

    const newTestimonial = new Testimonial({userID, oppID, affiliation, rating, review_text, verified});

    if (!userID || !oppID || !affiliation || !rating) {
        return res.status(400).json({ msg: 'Please enter all fields!' })
    }
    
    newTestimonial.save()
      .then((opp) => res.json("Testimonial Created"))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:key/:id', (req, res) => {
    
    console.log(req.params)

    var id = req.params.id;
    var key = req.params.key;
  
    if (key == "987654321") {
        Testimonial.remove({ _id: id }, { justOne: true })
        .then(() => res.json('Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
});

module.exports = router;
