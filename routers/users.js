const express = require('express');
const router = express.Router();
require('../models/Users');
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const bcrypt = require('bcrypt');
var passport = require('passport');
const Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function (email, password, cb) {
    db.users.findOne(email, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

//login user
router.get('/login', (req, res) => {
  res.render('users/login')
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
});
//register user
router.get('/register', (req, res) => {
  res.render('users/register')
});

//post registeration Form
router.post('/register', (req, res) => {
  //Get user Data
  var newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  //Validation 
  let errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({
      text: "Passwords don't matched"
    })
  }
  if (req.body.password.length < 4) {
    errors.push({
      text: "password length must be larger than 4 digits"
    })
  }
  //if There error
  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      password2: req.body.password2,
    })
  }
  //No errors
  else {
    //Encryption Password with bycrypt
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        //save encrypted password into new user password
        newUser.password = hash;
        //if memeber is exits or not
        User.findOne({
          email: req.body.email
        }).then(user => {
          if (user) {
            req.flash("error_msg", "this email is already taken");
            res.redirect('register');
          } else {
            //save new user into DB and make promise
            new User(newUser).save()
              .then(user => {
                req.flash("success_msg", "Register successfully");
                res.redirect('/users/login');
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      });
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logout');
  res.redirect('/users/login')
});
//Export
module.exports = router;