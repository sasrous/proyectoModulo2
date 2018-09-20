var express = require('express');
var router = express.Router();
var User = require('../models/user');


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();
  
  // if they aren't redirect them to the home page
  res.redirect('/');
  };
  //}


router.get('/lobby', isLoggedIn, (req, res, next) => {
  res.render('lobby', { user : req.user // get the user out of session and pass to template
    
  });
  
});


router.get('/lobby/event/:eventid', isLoggedIn, (req, res, next) => {
  const  eventid  = req.params;
  
  res.render('details', {user : req.user, eventid : eventid
  
  });
});




module.exports = router;

