const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const port = 3000;
var app = express();

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