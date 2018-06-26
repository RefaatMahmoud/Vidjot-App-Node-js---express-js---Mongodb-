const express = require('express');
const exphbs = require('express-handlebars');

const port = 3000;
var app = express();

//Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Routes
app.get('/', (req, res) => {
    var author = "Refaat Aish";
    res.render('Index', {
        author: author
    });
});

app.get('/about', (req, res) => {
    res.render('About');
});

//Listen server
app.listen(port, () => {
    console.log(`server started with port${port}`)
});