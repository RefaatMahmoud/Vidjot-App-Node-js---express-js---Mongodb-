const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
//Listen server
app.listen(port, () => {
    console.log(`server started with port ${port}`)
});