var express = require('express');
var router = express.Router();
const passport = require('passport');
const multer = require('multer');
var User = require('../models/user');

const multerConfig = {

  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({

    //specify destination
    destination: function(req, file, next){
      next(null, './public/photo-storage');
    },

    //should fix it and specify the filename to be unique (user id )
    filename: function(req, file, next){
      console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      
      next(null, "profilepic" + '.'+ext);
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: function(req, file, next){
        if(!file){
          next();
        }

      // only permit image mimetypes
      const image = file.mimetype.startsWith('image/');
      if(image){
        console.log('photo uploaded');
        next(null, true);
      }else{
        console.log("file not supported")
       
        return next();
      }
  }
};

// PROFILE FORM SECTION =
router.get('/profile/form', isLoggedIn, (req, res, next) => {
  res.render('profileform', { user : req.user // get the user out of session and pass to template
  
});
});
router.post('/profile/form/submit', isLoggedIn,  multer(multerConfig).single('photo'),function(req, res, next){

      User.findById(req.user.id, function (err, user) {

      
      if (req.body.username.length > 0) {
      var username = req.body.username;
      user.profile.username = username;}
      if (req.body.about.length > 0){
      var about = req.body.about;
      user.profile.about = about;}
      
      var photo = req.body.photo;

      if (req.body.address.length > 0) {
      var address = req.body.address;
      user.profile.address = address;}
      if (req.body.region.length > 0) {
      var region = req.body.region;
      user.profile.region = region;}
      if (req.body.country.length >0) {
      var country = req.body.country;
      user.profile.country = country;}
     
      
      user.profile.photo = photo;
      
      
      user.save(function (err) {


        res.redirect('/profile');

          });
        });
      });
      
router.get('/logout', (req, res) => {
req.logout();
res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on 
if (req.isAuthenticated())
    return next();

// if they aren't redirect them to the home page
res.redirect('/');
};
//}


// PROFILE SECTION =
router.get('/profile', isLoggedIn, (req, res, next) => {
  for (i=0; i< req.user.events.length; i++){ 
  }
  res.render('profile', { user : req.user // get the user out of session and pass to template
  });
 
  
});
router.get('/logout', (req, res) => {
req.logout();
res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on 
if (req.isAuthenticated())
    return next();

// if they aren't redirect them to the home page
res.redirect('/');
};
//}
module.exports = router;
