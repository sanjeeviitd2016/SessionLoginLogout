const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const jwt= require('jsonwebtoken')
const ejs= require('ejs');
const path= require('path')

const router = express.Router();
const empcntrl = require('./controller/employee');

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'Public')))

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

router.get('/',(req,res)=>{
    console.log(req.session)
    res.render('home.ejs',{name:req.session.name})
    
});

router.get("/logout",(req,res)=>{
    console.log(req.session)
    req.session.destroy();
    res.redirect("/employee/login");
})

router.get("/login",(req,res)=>{
    console.log(req.session)
    res.render(path.join('login.ejs'))
})
router.get("/signup",(req,res)=>{
    res.render('signup.ejs')
})






router.post("/signup1", empcntrl.addData);
router.post("/login1", empcntrl.login);
router.get("/details",authjwt,empcntrl.getData);


module.exports = router;