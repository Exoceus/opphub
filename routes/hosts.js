const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');

const router = require('express').Router();
let Host = require('../models/host.model.js');
const { query } = require('express');
require('dotenv').config();

AWS_BUCKET = "";
AWS_SECRET = ""
AWS_ACCESS = "";

const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_ACCESS,
    Bucket: AWS_BUCKET
});

const hostImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 1500000 }, // In bytes: 1000000 bytes = 1 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('hostImage');


function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype); if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


router.get('/all', (req, res) => {
    Host.find()
        .then(profiles => res.json(profiles))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.get('/search', (req, res) => {
    var query = req.query.query
    Host.find({ $text: { $search: query } }).limit(5)
        .then(hosts => res.json(hosts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/img-upload', (req, res) => {
    hostImgUpload(req, res, (error) => {
        console.log('error', error);
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log('Error: No File Selected!');
                res.json('Error: No File Selected');
            } else {
                // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;
                res.json({
                    image: imageName,
                    location: imageLocation
                });
            }
        }
    });
});


//PROFILE CREATION
router.post('/new', (req, res) => {
    var host_name = req.body.host_name;
    var host_type = req.body.host_type;
    var profile_pic = req.body.profile_pic;
    var description = req.body.description;
    var location = req.body.location;
    var tags = req.body.tags;
    var sector = req.body.sector;
    var website = req.body.website;
    var verified = req.body.verified;
    var UID = req.body.UID;
    var temp_region = req.body.temp_region;


    if (typeof verified === 'undefined') {
        verified = false;
    }

    const newHost = new Host({ host_name: host_name, host_type: host_type, description: description, location: location, tags: tags, sector: sector, website: website, UID: UID, profile_pic: profile_pic, temp_region: temp_region });

    console.log('Received request!')

    if (!host_name || !UID) {
        return res.status(400).json({ msg: 'Please enter all fields!' })
    }

    newHost.save()
        .then((host) => res.json("Created Host"))
        .catch(err => res.status(400));
});



router.get('/UID/:id', (req, res) => {

    const UID = req.params.id;

    Host.findOne({ UID: UID })
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json('Error: ' + err));
})

//DESCRIPTION ROUTES

//PROFILE CREATION


//ARTICLE ROUTES
router.post('/update/:id', (req, res) => {

    const UID = req.params.id;

    Host.updateOne({ UID: UID },
        {
            $set: {
                'host_name': req.body.host_name,
                'profile_pic': req.body.profile_pic,
                'host_type': req.body.host_type,
                'description': req.body.description,
                'location': req.body.location,
                'tags': req.body.tags,
                'sector': req.body.sector,
                'website': req.body.website,
                'temp_region': req.body.temp_region,
            }
        }
    ).then(() => res.json('Host Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/opp/:id', (req, res) => {

    Host.findById(req.params.id)
        .then(host => res.json({
            host_name: host.host_name,
            profile_pic: host.profile_pic
        }))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/:id', (req, res) => {
    Host.findById(req.params.id)
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = router;