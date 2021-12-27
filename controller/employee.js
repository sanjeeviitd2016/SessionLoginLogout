
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const employee = require("../models/employee");


const addData = async (req, res) => {
  try {
    const { Name, Email, Password, Address, Contact } = req.body;
    if (!(Email && Password && Name && Address && Contact)) {
      res.status(400).send("All input are required..")
    }

    const OldUser = await employee.findOne({ Email });
    if (OldUser) {
      return res.status(409).send("User already exits!");
    }
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(Password, salt)
    const params = { Name, Email }
    const token = jwt.sign(params, process.env.PRIVATE_KEY, { expiresIn: "2h" });
    const data = new employee(
      {
        Name,
        Email,
        Address,
        Contact,
        Password: password,
        Token: token
      });

    data.save(async (err, data) => {
      if (err) {
        cosole.log(err)
      }
      // res.status(201).json({ Details: data })
      res.redirect("/employee/login")
    })
  }
  catch (err) {
    console.log(err)
  }
}


const login = async (req, res) => {

  try {
    const { Email, Password } = req.body;

    if (!(Email && Password)) {
      return res.status(400).send("All feilds are required..")
    }

    const empdata = await employee.findOne({ Email });
    const match = await bcrypt.compare(Password, empdata.Password);

    if (empdata && match) {
      const params = { Email };
      const token = jwt.sign(params, process.env.PRIVATE_KEY, { expiresIn: "174h" })
      Session= req.session;
      Session.userId= empdata.Email;
      Session.name= empdata.Name;
      console.log(Session)
      
      res.redirect('/employee',)
    }
    else {
      res.redirect("/employee/login")
    }
  }
  catch (err) {
    console.log(err)
  }
}



const getData = (req, res) => {
  res.send("Hurray Now you can Have the details..")
}


module.exports = {
  login,
  addData,
  getData
}