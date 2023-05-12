const router = require('express').Router();
const path = require('path');
const url = require('url');

let RegUser = require('../models/user.model');

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

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

router.post('/img-upload', (req, res) => {
  console.log('img req reeceived')
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

router.get('/all', (req, res) => {
  RegUser.find()
    .then(profiles => res.json(profiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/all/new', (req, res) => {
  RegUser.find().sort({ createdAt: -1 })
    .then(profiles => res.json(profiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

//PROFILE CREATION
router.post('/new', (req, res) => {
  var email = req.body.email;
  var name = req.body.name;
  var UID = req.body.UID;

  var profile_img = req.body.profile_img || 'https://opphubhostimages.s3.us-east-2.amazonaws.com/default_user_icon.png';

  const newRegUser = new RegUser({ name: name, UID: UID, email: email, profile_img: profile_img });

  console.log('Received request! Right now')

  if (!name || !UID || !email) {
    return res.status(400).json({ msg: 'Please enter all fields!' })
  }

  newRegUser.save()
    .then((host) => res.json("Created User"))
    .catch(err => res.status(400));
});


router.get('/UID/:id', (req, res) => {

  const UID = req.params.id;

  RegUser.findOne({ UID: UID })
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/:id', (req, res) => {
  RegUser.findById(req.params.id)
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('Error: ' + err));

});


router.post('/update/:id', (req, res) => {

  const id = req.params.id;

  RegUser.updateOne({ _id: id },
    {
      $set: {
        'name': req.body.name,
        'bio': req.body.bio,
        'tagline': req.body.tagline,
        'instagram': req.body.instagram,
        'linkedin': req.body.linkedin,
        'twitter': req.body.twitter,
        'website': req.body.website,
      }
    }
  ).then(() => res.json('User Updated!'))
    .catch(err => res.status(400).json('Error: ' + err));

});


router.post('/profile-img-update/:id', (req, res) => {

  console.log(req.body.profile_img)
  const id = req.params.id;

  RegUser.updateOne({ _id: id },
    {
      $set: {
        'profile_img': req.body.profile_img,
      }
    }
  ).then(() => res.json('User Updated!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.post('/new/opp', (req, res) => {
  var opp_id = req.body.opp_id;
  var user_id = req.body.user_id

  console.log('Received request! Right now')

  if (!opp_id || !user_id) {
    return res.status(400).json({ msg: 'Please enter all fields!' })
  }

  RegUser.update({ _id: user_id }, { $push: { starred_opps: opp_id } })
    .then((host) => res.json("Added starred opportunity"))
    .catch(err => res.status(400));
});

router.post('/remove/opp', (req, res) => {
  var opp_id = req.body.opp_id;
  var user_id = req.body.user_id;

  console.log('Received request! Right now')

  if (!opp_id || !user_id) {
    return res.status(400).json({ msg: 'Please enter all fields!' })
  }

  RegUser.update({ _id: user_id }, { $pull: { starred_opps: opp_id } })
    .then((host) => res.json("Removed starred opportunity"))
    .catch(err => res.status(400));
});

module.exports = router;