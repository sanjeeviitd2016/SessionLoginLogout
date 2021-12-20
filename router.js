const express= require('express');
const router= express.Router();
const empcntrl= require("./controller/employee")

router.get("/",empcntrl.getData);

module.exports= router;