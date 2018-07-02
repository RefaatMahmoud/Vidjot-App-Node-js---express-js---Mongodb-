const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Load Ideas Schema
require('../models/ideas');
const Ideas = mongoose.model('Ideas');
//Add Idea Form
router.get('/add', (req, res) => {
  res.render('ideas/add');
});
//Post new Idea
router.post('/', (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({
      text: "Please Enter Title"
    });
  }
  if (!req.body.details) {
    errors.push({
      text: "Please Enter details"
    });
  }
  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details,
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Ideas(newUser)
      .save().then(ideas => {
        req.flash("success_msg", "Idea added successfully");
        res.redirect('/ideas')
      });

  }
});
//Edit Idea Form
router.get('/edit/:id', (req, res) => {
  Ideas.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render('ideas/edit', {
      idea: idea
    })
  });
});
//Update Data From Edit Form
router.put('/:id', (req, res) => {
  Ideas.findOne({
    _id: req.params.id
  }).then(idea => {
    //new Values
    idea.title = req.body.title;
    idea.details = req.body.details;
    //save 
    idea.save()
  }).then(idea => {
    req.flash("success_msg", "Idea Updated successfully");
    res.redirect('/ideas')
  });
});
//Delete Idea
router.delete('/:id', (req, res) => {
  Ideas.remove({
    _id: req.params.id
  }).then(() => {
    req.flash("success_msg", "Idea removed successfully");
    res.redirect('/ideas');
  });
});
//Display All Ideas
router.get('/', (req, res) => {
  //Get Data From DB
  Ideas.find({})
    .then(data => {
      res.render('ideas/index', {
        ideas: data
      })
    });
});
//Export
module.exports = router;