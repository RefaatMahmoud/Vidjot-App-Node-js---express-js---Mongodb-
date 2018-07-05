const express = require('express');
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;
//Listen server
app.listen(port, () => {
    console.log(`server started with port ${port}`)
});