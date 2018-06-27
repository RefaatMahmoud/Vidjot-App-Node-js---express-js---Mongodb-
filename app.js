const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const mongoose = require('mongoose');
const port = 3000;
var app = express();

//map global promise
mongoose.Promise = global.Promise;

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

//Set public folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.get('/', (req, res) => {
    var title = "Welcome";
    res.render('Index', {
        title: title
    });
});

app.get('/about', (req, res) => {
    res.render('About');
});

//Listen server
app.listen(port, () => {
    console.log(`server started with port${port}`)
});