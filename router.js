const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const jwt= require('jsonwebtoken')

const router = express.Router();
const empcntrl = require('./controller/employee');

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());


const authjwt = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers.authrization;

    if (!token) {
        return res.status(403).send("A token is required for authentication..");

    }
    try {
        var privatekey = process.env.PRIVATE_KEY;
        jwt.verify(token, privatekey,(err,docs)=>{
            if(err){
                res.status(400).send("Token is not valid..")
            }
            else{
                // res.send(docs)
                next()
            }
        });
        
    }
    catch (err) {
        console.log(err)
    }
}

router.post("/signup", empcntrl.addData);
router.post("/login", empcntrl.login);
router.get("/details",authjwt,empcntrl.getData);


module.exports = router;