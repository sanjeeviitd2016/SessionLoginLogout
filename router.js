const express= require('express');
const bodyparser= require("body-parser")
const app= express();

const router= express.Router();
const empcntrl= require('./controller/employee')

router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());


const authjwt= (req,res,next)=>{
    var token =req.headers.authrization;
    token= token.split(" ");
    var privatekey= "jfhgisihgisehgiwgsrgdfbshjbbjgjgsbjsbbjsbgsjgjgjg";
    jwt.verify(token,privatekey,(err,docs)=>{
        if(err){
            console.log('Token not verified')
        }
        else{
            next();
        }
    })
}

router.post("/signup",empcntrl.addData)
router.post("/login",empcntrl.login);
router.get("/getData",authjwt,empcntrl.getData)

module.exports=router;