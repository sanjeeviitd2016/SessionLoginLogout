const express = require('express');
const port = 5000;
const app = express();

require("./config/database")

const router = require("./router");
app.use("/employee", router);


app.listen(port, () => {
    console.log(`port ${port} is listening...`)
})