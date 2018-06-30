const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session')
const port = 3000;
var app = express();

//map global promise
//mongoose.Promise = global.Promise;

//Connect ot mongoess 
mongoose.connect("mongodb://localhost/vidjot-dev").
then(() => console.log('Connected to Mongo')).
catch(err => console.log(err));;

//Load Ideas Schema
require('./models/Ideas');
const Ideas = mongoose.model('Ideas');

//Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body-pareser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//methodOverride middleware
app.use(methodOverride('_method'))

//express-session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Connect-flash middleware
app.use(flash());

//Global Variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
//Set public folder
//app.use(express.static(path.join(__dirname, "public")));

//Routes 
//Index Page
app.get('/', (req, res) => {
    var title = "Welcome";
    res.render('index', {
        title: title
    });
});
//About Page
app.get('/about', (req, res) => {
    res.render('about');
});

//Add Idea Form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

//Post new Idea
app.post('/ideas', (req, res) => {
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
app.get('/ideas/edit/:id', (req, res) => {
    Ideas.findOne({
        _id: req.params.id
    }).then(idea => {
        res.render('ideas/edit', {
            idea: idea
        })
    });
});
//Update Data From Edit Form
app.put('/ideas/:id', (req, res) => {
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
app.delete('/ideas/:id', (req, res) => {
    Ideas.remove({
        _id: req.params.id
    }).then(() => {
        req.flash("success_msg", "Idea removed successfully");
        res.redirect('/ideas');
    });
});
//Display All Ideas
app.get('/ideas', (req, res) => {
    //Get Data From DB
    Ideas.find({})
        .then(data => {
            res.render('ideas/index', {
                ideas: data
            })
        });
});

//Listen server
app.listen(port, () => {
    console.log(`server started with port${port}`)
});