
const collection= require("../models/employee")


const getData= (req,res)=>{
  collection.find({},(err,data)=>{
      console.log(data)
  })

}
module.exports= {

    getData
}