const mongoose= require('mongoose');
const schema= new mongoose.Schema({
    Name:String,
    Email:String,
    Password: String,
    Adress:String,
    ContactNo: Number
})


const models= mongoose.model("employee",schema);
module.exports= models;