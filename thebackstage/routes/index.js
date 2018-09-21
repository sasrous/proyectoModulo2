const express = require('express');
const router = express.Router();
const passport = require('passport')

//module.exports = function(router, passport){
  /* GET home page. */
  router.get('/', (req, res, next) => {
    res.render('index', { title: 'Homepage' });
  });


module.exports = router;

