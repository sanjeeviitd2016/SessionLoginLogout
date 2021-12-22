const mongoose= require('mongoose');
const employeeSchema= new mongoose.Schema({
    Name:     {type:String,default:null},
    Email:    {type:String,default:null, unique:true},
    Password: {type:String},
    Address:  {type:String},
    Contact:  {type:Number},
    Token:    {type:String}
})


const models= mongoose.model("employees",employeeSchema);
module.exports= models;