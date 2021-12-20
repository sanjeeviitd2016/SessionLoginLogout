const mongoose= require('mongoose');

const schema= new mongoose.Schema({

    //  _id: mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    // class: String
    password: String
})


const model= mongoose.model("student",schema);
module.exports= model;