const mongoose= require('mongoose');

const url= "mongodb://localhost:27017/Nexus";
mongoose.connect(url,{ 
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected...")
})

module.exports= mongoose;