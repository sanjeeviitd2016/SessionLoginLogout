const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT ;



require("./config/database")
const router = require("./router");
app.use("/employee", router);

app.listen(port, () => {
    console.log(`port ${port} is listening...`)
})