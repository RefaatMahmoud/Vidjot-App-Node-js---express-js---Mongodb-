const express = require('express');
const router = express.Router();

//login user
router.get('/login', (req, res) => {
  res.send('Login')
});
//register user
router.get('/register', (req, res) => {
  res.send('register')
});

//Export
module.exports = router;