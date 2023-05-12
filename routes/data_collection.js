const router = require('express').Router();
let filters = require('../models/filters.model');

require('dotenv').config();


router.get('/filter/all', (req, res) => {
    filters.find()
        .then(opportunities => res.json(opportunities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/filter/all/new', (req, res) => {
    filters.find().sort({ createdAt: -1 }).limit(50)
        .then(opportunities => res.json(opportunities))
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET ALL OPPS FOR A PARTICULAR HOST
router.get('/filter/:id', (req, res) => {
    var id = req.params.id;

    filters.find({ _id: id })
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));

});

//PROFILE CREATION
router.post('/filter/new', (req, res) => {
    var search = req.body.search;
    var target_demo = req.body.target_demo;
    var sector = req.body.sector;
    var position_type = req.body.position_type;
    var location = req.body.location;

    const newFilter = new filters(
        {
            search: search,
            target_demo: target_demo,
            sector: sector,
            position_type: position_type,
            location: location
        }
    );


    newFilter.save()
        .then((filter) => res.json("filter saved"))
        .catch(err => {
            res.status(400).json('Error: ' + err)
            console.log('ERROR:' + err)
        });
});

module.exports = router;