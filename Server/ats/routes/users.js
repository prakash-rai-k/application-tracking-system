/**
 * Created on: May 20, 2018
 * User router and controller
 * Uses the model schema developed by Prakash Rai
 * Designed by Prakash Rai
 * @author Prakash Rai
 */

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://atsuser:atsuser@ds229690.mlab.com:29690/ats');

/* GET users listing. */
router.post('/token', function(req, res, next) {
    const user = req.body;
    let userDb;
    User.findOne()
        .where('username', user.username)
        .where('password', user.password)
        .then(data => {
          const tk = (data.length != 0) ? jwt.sign({data},'my_secret_key') : 'NOT_VALID'; 
          res.status(200).json({userId : data._id, token : tk});
        });
  });

  /* GET users listing. */
router.get('/:id',ensureToken, authorization, function(req, res, next) {
  User.findById(req.param('id'))
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500));
  });

  function authorization(req, res, next){
    console.log("In authorization");
    jwt.verify(req.token, "my_secret_key", function(err, data){
      if(err){
        res.send('Forbidden');
      }
      
      next();
    });
  }

  function ensureToken(req, res, next) {
    console.log("In ensure token");
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

/* POST new application */
router.post('/', function(req, res, next) {
  const user = new User(req.body);
  user.save();
  res.status(200).json(user);
});

/* Update new application */
router.put('/', function(req, res, next) {
    const user = new User(req.body);
    console.log(req.body.companyName);
    User.findById(req.body._id, function(err, doc){
        if(err){
            res.status(500);
        }

        doc.username = req.body.username;
        doc.password = req.body.password;
        doc.createDate = req.body.createDate;
        
        doc.save();
    });
    res.status(200).json(user);
  });

module.exports = router;
