const mongoose= require('mongoose');
const url= process.env.MONGO_URL;
mongoose.connect(url,{ 
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex: true,
    // useFindAndModify:false
}).then(()=>{
    console.log("Database connected...")
}).catch((error)=>{
    console.log("Database connection failed");
    process.exit(1)
});

module.exports= mongoose;