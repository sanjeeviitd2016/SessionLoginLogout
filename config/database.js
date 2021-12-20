const mongoose= require('mongoose');
const url= "mongodb://localhost:27017/School"

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database is connected")
})

module.exports= mongoose;