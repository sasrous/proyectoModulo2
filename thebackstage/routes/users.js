var express = require('express');
var router = express.Router();
const passport = require('passport')


// PROFILE FORM SECTION =
router.get('/profile/form', isLoggedIn, (req, res, next) => {
  res.render('profileform', { user : req.user // get the user out of session and pass to template
  });
});
router.put('/profile/form',(req, res, next) => {

  
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
