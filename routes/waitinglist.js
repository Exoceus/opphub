const router = require('express').Router();
let waitingUser = require('../models/waitinglist.model');

require('dotenv').config();


router.get('/all', (req, res) => {
    waitingUser.find()
        .then(opportunities => res.json(opportunities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/all/new', (req, res) => {
    waitingUser.find().sort({ createdAt: -1 }).limit(50)
        .then(opportunities => res.json(opportunities))
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET ALL OPPS FOR A PARTICULAR HOST
router.get('/:id', (req, res) => {
    var id = req.params.id;

    waitingUser.find({ _id: id })
        .then(opps => res.json(opps))
        .catch(err => res.status(400).json('Error: ' + err));

});

//PROFILE CREATION
router.post('/new', (req, res) => {
    var email = req.body.email;

    const newUser = new waitingUser({ email: email });

    if (!email) {
        return res.status(400).json({ msg: 'Please enter all fields!' })
    }

    newUser.save()
        .then((user) => res.json("waiting user Created"))
        .catch(err => {
            res.status(400).json('Error: ' + err)
            console.log('ERROR:' + err)
        });
});

module.exports = router;