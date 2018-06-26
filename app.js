const express = require('express');
const port = 3000;
var app = express();

//Routes
app.get('/' ,(req , res)=>{
    res.send('Index');
});

app.get('/about' ,(req , res)=>{
    res.send('About');
});

//Listen server
app.listen(port , ()=>{
    console.log(`server started with port${port}`)
});