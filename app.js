const express = require('express');
const port = 3000;
var app = express();

//Listen server
app.listen(port , ()=>{
    console.log(`server started with port${port}`)
});