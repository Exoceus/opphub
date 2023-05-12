const path = require('path');
const fs = require('fs')

const router = require('express').Router();
let Opportunity = require('../models/opportunity.model.js');
let RegUser = require('../models/user.model');

//META TAGS
router.get('/', function(request, response) {
    console.log('Home page visited!');
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Discover Student Opportunities');
      data = data.replace(/\$OG_DESCRIPTION/g, "OppHub allows high school and university students to discover a diverse mix of opportunities such as competitions, internships and programs from academic institutions and companies!");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });

  router.get('/opps', function(request, response) {
    console.log('Home page visited!');
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Discover Student Opportunities');
      data = data.replace(/\$OG_DESCRIPTION/g, "OppHub allows high school and university students to discover a diverse mix of opportunities such as competitions, internships and programs from academic institutions and companies!");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });

  
  router.get('/opp/:id', function(request, response) {
    console.log('opp page visited!', request.params.id);
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
  
      
      var id = request.params.id;
  
        Opportunity.find({ _id: id })
        .then((opps) => {

          // replace the special strings with server generated strings
          data = data.replace(/\$OG_TITLE/g, `${opps[0].title.substring(0, 60)} | OppHub`);
          data = data.replace(/\$OG_DESCRIPTION/g, `${opps[0].description.substring(0, 165)}... Discover hundreds of other opportunities on OppHub.`);
          result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
          response.send(result);
        })
        .catch(err => response.status(400).json('Error: ' + err));
  
    });
  });

  router.get('/user/:id', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      RegUser.findById(request.params.id)
        .then(profile => {
            data = data.replace(/\$OG_TITLE/g, `${profile.name} | ${profile.tagline || 'OppHub Profile'}`);

            if(profile.bio){
                data = data.replace(/\$OG_DESCRIPTION/g, `${profile.bio.substring(0, 175)}...`);
            }

            else{
                data = data.replace(/\$OG_DESCRIPTION/g, `${profile.name}'s OppHub user profile. Check out their opportunity bookmarks and reviews!`);
            }
           
            result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
            
            response.send(result);
        })
        .catch(err => response.status(400).json('Error: ' + err));
  
  
    });
  });
  
  
  router.get('/about', function(request, response) {
    console.log('about page visited!');
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - About');
      data = data.replace(/\$OG_DESCRIPTION/g, "We are a diverse group high school students based in Ontario, Canada united under our goal of making opportunities of all kinds available to high school students.");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });


  router.get('/suggest/opp', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Add A New Opportunity');
      data = data.replace(/\$OG_DESCRIPTION/g, "You can use this portal to add a new opportunity to the OppHub platform!");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });
  
  router.get('/all-opps', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - All Opportunity Categories');
      data = data.replace(/\$OG_DESCRIPTION/g, "Check out all of the different opportunities on the OppHub platform categorized by sectors, opportunity types, location and demographics.");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });
  
  
  router.get('/signup/ambassador', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Ambassador Signup');
      data = data.replace(/\$OG_DESCRIPTION/g, "Signup to be an ambassador and contribute to OppHub in a meaningful way.");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });
  
  
  router.get('/login/ambassador', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Ambassador Login');
      data = data.replace(/\$OG_DESCRIPTION/g, "Login to your ambassador account and contribute to OppHub in a meaningful way.");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });

  router.get('/signup/org', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Organization Login');
      data = data.replace(/\$OG_DESCRIPTION/g, "Signup as an organization to post your organization's opportunities onto OppHub and create an organization profile!");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });

  router.get('/login/org', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Organization Login');
      data = data.replace(/\$OG_DESCRIPTION/g, "Login to your organization account to post your organization's opportunities onto OppHub and create an organization profile! ");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });

  router.get('/login/user', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Login');
      data = data.replace(/\$OG_DESCRIPTION/g, "Login to your account to access your bookmarked opportunities, write opportunity reviews and create your user profile page!");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });

  router.get('/signup/user', function(request, response) {
    const filePath = path.resolve(__dirname, '../client/build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'OppHub - Signup');
      data = data.replace(/\$OG_DESCRIPTION/g, "Create your OppHub account to access your bookmarked opportunities, write opportunity reviews and create your user profile page!");
      result = data.replace(/\$OG_IMAGE/g, 'https://opphubhostimages.s3.us-east-2.amazonaws.com/OppHub+Banner+Basic.png');
      response.send(result);
    });
  });

  module.exports = router;