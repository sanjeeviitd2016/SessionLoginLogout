const express = require('express');
const app = express();
const cookie= require('cookie-parser')
const session= require('express-session')
require('dotenv').config();
const port = process.env.PORT 
const collection= require('./models/employee')


require("./config/database")
app.use(cookie())

app.use(session({
    secret:'sanjeev123svbsdsbgdv',
    saveUninitialized: false,
    resave:true,
    cookie: { maxAge: 180000,httpOnly:true},
    // store: collection.create()
}))




const router = require("./router");
const { collection } = require('./models/employee');
app.use("/employee", router);


app.listen(port, () => {
    console.log(`port ${port} is listening...`)
})