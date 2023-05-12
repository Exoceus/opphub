const path = require('path');
const url = require('url');

const router = require('express').Router();
let Ambassador = require('../models/ambassador.model.js');
const { query } = require('express');
require('dotenv').config();

router.get('/all', (req, res) => {
    Ambassador.find()
        .then(profiles => res.json(profiles))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.get('/search', (req, res) => {
    var query = req.query.query
    Ambassador.find({ $text: { $search: query } }).limit(5)
        .then(hosts => res.json(hosts))
        .catch(err => res.status(400).json('Error: ' + err));
});


//PROFILE CREATION
router.post('/new', (req, res) => {
    var email = req.body.email;
    var ambassador_name = req.body.ambassador_name;
    var verified = req.body.verified;
    var UID = req.body.UID;


    if (typeof verified === 'undefined') {
        verified = false;
    }

    const newHost = new Ambassador({ ambassador_name: ambassador_name, UID: UID, email: email });

    console.log('Received request!')

    if (!ambassador_name || !UID || !email) {
        return res.status(400).json({ msg: 'Please enter all fields!' })
    }

    newHost.save()
        .then((host) => res.json("Created Ambassador"))
        .catch(err => res.status(400));
});



router.get('/UID/:id', (req, res) => {

    const UID = req.params.id;

    Ambassador.findOne({ UID: UID })
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json('Error: ' + err));
})

//DESCRIPTION ROUTES

//PROFILE CREATION


//ARTICLE ROUTES
router.post('/update/:id', (req, res) => {

    const UID = req.params.id;

    Ambassador.updateOne({ UID: UID },
        {
            $set: {
                'host_name': req.body.host_name,
                'profile_pic': req.body.profile_pic,
                'host_type': req.body.host_type,
                'description': req.body.description,
                'location': req.body.location,
                'tags': req.body.tags,
                'sector': req.body.sector,
                'website': req.body.website
            }
        }
    ).then(() => res.json('Ambassador Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/opp/:id', (req, res) => {

    Ambassador.findById(req.params.id)
        .then(host => res.json({
            host_name: host.host_name,
            profile_pic: host.profile_pic
        }))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/:id', (req, res) => {
    Ambassador.findById(req.params.id)
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = router;