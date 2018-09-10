const express = require('express');
const router = express.Router();
const passport = require('passport')


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
     successRedirect : '/profile/form', // redirect to the secure profile section
     failureRedirect : '/signup', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
  }));




  

module.exports = router;

