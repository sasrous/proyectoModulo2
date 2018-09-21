var express = require('express');
var router = express.Router();
const passport = require('passport');
const multer = require('multer');
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
  var  eventid  = req.params;
  
  res.render('details', {user : req.user, eventid : eventid
  
  });
});




router.post('/lobby/event/:eventid/submit', isLoggedIn, function(req, res, next) {
  var  eventid  = req.params.eventid;
  var event_id_int = parseInt(eventid) 
  user_id = req.user.id

  User.findById(req.user.id, function (err, user) {
    if(req.user.events.length != 0) {
    for (i=0 ; i < req.user.events.length; i++ ){
      
      if (req.user.events[i] === event_id_int){
        console.log("found")
        return
      }
      else if ( i == req.user.events.length-1 ) {
        User.findByIdAndUpdate(req.user.id, { $push: { events: event_id_int }}, { new: true })
        .then(() => {
        // lo que quieras hacer

        console.log("donezo")
        res.redirect(`/lobby/event/${parseInt(eventid)}`);
        })
      }
    
    }}
    else { User.findByIdAndUpdate(req.user.id, { $push: { events: event_id_int }}, { new: true })
    .then(() => {
    // lo que quieras hacer

    console.log("donezo2")
    res.redirect(`/lobby/event/${parseInt(eventid)}`);
    })

    }
    })
    
  


});



module.exports = router;

