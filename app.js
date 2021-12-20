const express= require('express');
const app= express();
const port= 8088;
const router= require('./router')


app.use("/employee",router);
require('./config/database')

app.listen(port,()=>{
    console.log(`port ${port } is listenening..`)
})