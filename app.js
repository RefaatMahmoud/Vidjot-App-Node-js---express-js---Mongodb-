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

//Load router
ideas_router = require('./routers/ideas');
users_router = require('./routers/users');
//Connect ot mongoess 
mongoose.connect("mongodb://localhost/vidjot-dev").
then(() => console.log('Connected to Mongo')).
catch(err => console.log(err));;



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


//Use routers
app.use('/ideas', ideas_router);
app.use('/users', users_router);

//Listen server
app.listen(port, () => {
    console.log(`server started with port${port}`)
});