const express = require('express');
const router = express.Router();
const passport = require('passport')


//module.exports = function(router, passport){
  /* GET home page. */
  router.get('/', (req, res, next) => {
    res.render('index', { title: 'Homepage' });
  });
  // show the login form
  router.get('/login', (req, res, next) => {  // render the page and pass in any flash data if it exists
    res.render('login', {
    message: req.flash('loginMessage')
    });
  });
  // process the login form
  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

  // show the signup form
  router.get('/signup', (req, res, next) => {
    res.render('signup', { 
    message: req.flash('signupMessage')
    });
  });

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
     successRedirect : '/profile', // redirect to the secure profile section
     failureRedirect : '/signup', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
  }));




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

