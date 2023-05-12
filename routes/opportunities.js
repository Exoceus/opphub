const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');

const router = require('express').Router();
let Opportunity = require('../models/opportunity.model.js');

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
  var page = parseInt(req.query.page) || 0
  var limit = parseInt(req.query.limit) || 10

  Opportunity.find().skip(page * limit).limit(limit)
    .then(opportunities => res.json(opportunities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/all/non-amb', (req, res) => {
  var page = parseInt(req.query.page) || 0
  var limit = parseInt(req.query.limit) || 10

  Opportunity.find({ ambassador_id: null }).skip(page * limit).limit(limit)
    .then(opportunities => res.json(opportunities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/all/new', (req, res) => {
  var page = parseInt(req.query.page) || 0
  var limit = parseInt(req.query.limit) || 10

  Opportunity.find().sort({ createdAt: -1 }).skip(page * limit).limit(limit)
    .then(opportunities => res.json(opportunities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/search', (req, res) => {
  var query = req.query.query
  Opportunity.find({ $text: { $search: query } }).limit(5)
    .then(opps => res.json(opps))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/adv-search', (req, res) => {

  var filters = {}

  var limit = parseInt(req.query.limit) || 100

  if (req.query.region) {
    filters.temp_region = { $in: req.query.region }
  }

  if (req.query.sector) {
    filters.sector = { $in: req.query.sector }
  }

  if (req.query.type) {
    filters.position_type = { $in: req.query.type }
  }

  if (req.query.demographic) {
    filters.target_demo = { $in: req.query.demographic }
  }

  if (req.query.text) {
    filters.$text = { $search: req.query.text }

    var sorting = {}
  }

  else {
    var sorting = { createdAt: -1 }
  }

  console.log(filters)

  Opportunity.find(filters).limit(limit).sort(sorting)
    .then(opps => res.json(opps))
    .catch(err => res.status(400).json('Error: ' + err));
});

//GET ALL OPPS FOR A PARTICULAR HOST
router.get('/:id', (req, res) => {

  var id = req.params.id;

  Opportunity.find({ _id: id })
    .then(opps => res.json(opps))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.get('/all/filter', (req, res) => {

  var filters = {}
  if (req.query.location) {
    filters.location = req.query.location
  }

  if (req.query.temp_region) {
    filters.temp_region = req.query.temp_region
  }

  if (req.query.sector) {
    filters.sector = req.query.sector
  }

  if (req.query.position_type) {
    filters.position_type = req.query.position_type
  }

  if (req.query.target_demo) {
    filters.target_demo = req.query.target_demo
  }

  if (req.query.search) {
    filters.$text = { $search: req.query.search }
  }

  filters['$or'] = [{ archived: false }, { archived: null }]

  Opportunity.find(filters).sort({ createdAt: -1 })
    .then(opportunities => res.json(opportunities))
    .catch(err => {
      res.status(400).json('Error: ' + err)
      console.log(err)
    });
});

//new feature
router.get('/all/feature', (req, res) => {

  var filters = {}

  if (req.query.verified) {
    filters['$nor'] = [{ verified: false }, { ambassador_id: null }]
  }

  if (req.query.type == 'region') {
    filters.temp_region = req.query.value
  }

  else if (req.query.type == 'sector') {
    filters.sector = { $in: req.query.value }
  }

  else if (req.query.type == 'target_demo') {
    filters.target_demo = { $in: req.query.value }
  }

  else if (req.query.type == 'position_type') {
    filters.position_type = { $in: req.query.value }
  }

  filters['$or'] = [{ archived: false }, { archived: null }]


  Opportunity.find(filters).sort({ createdAt: -1 }).limit(parseInt(req.query.limit) || 10)
    .then(opportunities => res.json(opportunities))
    .catch(err => {
      res.status(400).json('Error: ' + err)
      console.log(err)
    });
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
  var host_id = req.body.host_id;
  var title = req.body.title;
  var description = req.body.description;
  var duration = req.body.duration;
  var location = req.body.location;
  var position_type = req.body.position_type;
  var tags = req.body.tags;
  var sector = req.body.sector;
  var target_demo = req.body.target_demo;
  var learn_more = req.body.learn_more;
  var application_link = req.body.application_link;
  var opp_img = req.body.opp_img;
  var temp_host_name = req.body.temp_host_name;
  var suggestion = req.body.suggestion;
  var ambassador_id = req.body.ambassador_id;
  var temp_region = req.body.temp_region;

  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var due_date = req.body.due_date;

  var poc = req.body.poc;

  var online = req.body.online;
  var verified = req.body.verified;

  var paid = req.body.paid;
  var recurring = req.body.recurring;

  const newOpportunity = new Opportunity({ host_id: host_id, title: title, description: description, duration: duration, location: location, position_type: position_type, tags: tags, sector: sector, target_demo: target_demo, learn_more: learn_more, application_link: application_link, opp_img: opp_img, temp_host_name: temp_host_name, suggestion: suggestion, poc: poc, start_date: start_date, end_date: end_date, due_date: due_date, ambassador_id: ambassador_id, temp_region: temp_region, online: online, verified: verified, recurring: recurring, paid: paid });

  if (!host_id || !title || !learn_more || !sector || !position_type) {
    return res.status(400).json({ msg: 'Please enter all fields!' })
  }

  newOpportunity.save()
    .then((opp) => res.json("Opportunity Created"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/user/UID/:id', (req, res) => {

  const UID = req.params.id;

  Opportunity.findOne({ UID: UID })
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('Error: ' + err));
})


router.post('/update/:id', (req, res) => {

  const id = req.params.id;

  Opportunity.updateOne({ _id: id },
    {
      $set: {
        'title': req.body.title,
        'description': req.body.description,
        'location': req.body.location,
        'duration': req.body.duration,
        'position_type': req.body.position_type,
        'tags': req.body.tags,
        'duration': req.body.duration,
        'sector': req.body.sector,
        'learn_more': req.body.learn_more,
        'poc': req.body.poc,
        'suggestion': req.body.suggestion,
        'start_date': req.body.start_date,
        'end_date': req.body.end_date,
        'due_date': req.body.due_date,
        'temp_host_name': req.body.temp_host_name,
        'temp_region': req.body.temp_region,
        'target_demo': req.body.target_demo,
        'online': req.body.online,
        'recurring': req.body.recurring,
        'paid': req.body.paid,
      }
    }
  ).then(() => res.json('Opp Updated!'))
    .catch(err => res.status(400).json('Error: ' + err));

});


//GET ALL OPPS FOR A PARTICULAR HOST
router.get('/org/:id', (req, res) => {

  var host_id = req.params.id;

  Opportunity.find({ host_id: host_id })
    .then(opps => res.json(opps))
    .catch(err => res.status(400).json('Error: ' + err));

});

//GET ALL OPPS FOR A PARTICULAR HOST
router.get('/amb/:id', (req, res) => {

  var ambassador_id = req.params.id;

  Opportunity.find({ ambassador_id: ambassador_id }).sort({ createdAt: -1 })
    .then(opps => res.json(opps))
    .catch(err => res.status(400).json('Error: ' + err));

});


router.delete('/del/:key/:id/', (req, res) => {

  var id = req.params.id;
  var key = req.params.key;

  if (key == "987654321") {
    Opportunity.remove({ _id: id }, { justOne: true })
      .then(() => res.json('Deleted'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.post('/ver/:key/:id', (req, res) => {

  var id = req.params.id;
  var key = req.params.key;

  if (key == "987654321") {
    Opportunity.updateOne({ _id: id },
      {
        $set: {
          'verified': true
        }
      }
    ).then(() => res.json('Opp Updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }

});


router.post('/unver/:key/:id/', (req, res) => {

  var id = req.params.id;
  var key = req.params.key;

  if (key == "987654321") {
    Opportunity.updateOne({ _id: id },
      {
        $set: {
          'verified': false
        }
      }
    ).then(() => res.json('Opp Updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});


router.post('/archive/:key/:id/', (req, res) => {

  var id = req.params.id;
  var key = req.params.key;

  if (key == "987654321") {
    Opportunity.updateOne({ _id: id },
      {
        $set: {
          'archived': true
        }
      }
    ).then(() => res.json('Opp Archived!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});


router.post('/unarchive/:key/:id/', (req, res) => {

  var id = req.params.id;
  var key = req.params.key;

  if (key == "987654321") {
    Opportunity.updateOne({ _id: id },
      {
        $set: {
          'archived': false
        }
      }
    ).then(() => res.json('Opp Unarchived!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.get('/all/archived', (req, res) => {
  Opportunity.find({ archived: true })
    .then(opportunities => res.json(opportunities))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
router.get('/mass/recurring', (req, res) => {
    recurring_arr.forEach(async (item, index) => {
      await Opportunity.updateOne({ _id: item },
        {
          $set: {
            'recurring': true
          }
        }
      ).then(opportunities => res.json(opportunities))
      .catch(err => res.status(400).json('Error: ' + err));
      console.log(index)
    })
});
*/


module.exports = router;