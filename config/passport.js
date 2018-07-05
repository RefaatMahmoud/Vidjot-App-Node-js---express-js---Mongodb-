const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//Load User mode
const User = mongoose.model('Users');
let errors = [];
//Export
module.exports = function (passport, res, req) {
  passport.use(new LocalStrategy({
    usernameField: "email"
  }, (email, password, done) => {
    //Match user
    User.findOne({
      email: email
    }).then(user => {
      //Match user
      if (!user) {
        //return done(error , user ,message )
        return done(null, false, {
          message: 'Email Not Found'
        });
      } else {
        //Mathc Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Password Not Correct'
            });
          }
        });
      }
    })
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
