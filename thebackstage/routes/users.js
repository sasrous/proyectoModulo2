var express = require('express');
var router = express.Router();
const passport = require('passport');
const multer = require('multer');

const multerConfig = {

  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({

    //specify destination
    destination: function(req, file, next){
      next(null, './public/photo-storage');
    },

    //specify the filename to be unique
    filename: function(req, file, next){
      console.log(file);
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      //set the file fieldname to a unique name containing the original name, current datetime and the extension.
      next(null, file.fieldname + '-' + Date.now() + '.'+ext);
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
        //TODO:  A better message response to user on failure.
        return next();
      }
  }
};

// PROFILE FORM SECTION =
router.get('/profile/form', isLoggedIn, (req, res, next) => {
  res.render('profileform', { user : req.user // get the user out of session and pass to template
  });
});
router.post('/profile/form/submit', multer(multerConfig).single('photo'),function(req, res){
  //Here is where I could add functions to then get the url of the new photo
  //And relocate that to a cloud storage solution with a callback containing its new url
  //then ideally loading that into your database solution.   Use case - user uploading an avatar...
  res.send('Complete! Check out your public/photo-storage folder.  Please note that files not encoded with an image mimetype are rejected. <a href="index.html">try again</a>');
}

);

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
