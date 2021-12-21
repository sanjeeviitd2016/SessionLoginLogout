
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const employee = require("../models/employee");






const addData = async (req, res) => {
  const salt= bcrypt.genSaltSync(10);
  const password= bcrypt.hashSync(req.body.password,salt)
  const data = new employee(
    {
      Name: req.body.name,
      Email: req.body.email,
      Password: password,
      Address: req.body.address,
      ContactNo: req.body.contact
    });

  data.save( async(err, data) =>
   { 
    if(err){
      throw(err)
    }
    else{
      var privatekey= "jfhgisihgisehgiwgsrgdfbshjbbjgjgsbjsbbjsbgsjgjgjg";
      let params= {
        email: data.Email, name: data.Name
    }
    const token=  await jwt.sign(params,privatekey,{expiresIn: '400000s'})
    console.log(token)
    res.status(201).json({token:token})

    }
   });
}

const login= async(req,res)=>{
  var result= await employee.findOne({Email:req.body.email},{});
  const match= await bcrypt.compare(req.body.password,result.Password)
  if(match){
    var privatekey= "jfhgisihgisehgiwgsrgdfbshjbbjgjgsbjsbbjsbgsjgjgjg";
    const params= {name: result.name, email:result.email}
    var token = await jwt.sign(params,privatekey,{expiresIn: '100000s'});
    res.status(200).json({message:"Hello you are logged in..", token:token})
}
  else{
    res.end('Enter correct credentials')
  }


}

const getData= (req,res)=>{
  res.end("You can excess")
}

module.exports = {
  login,
  addData,
  getData
}