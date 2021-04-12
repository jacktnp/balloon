// const User = require("../models/user");
// var bcrypt = require('bcryptjs');
// const variable_status = require("../config/variable_status");


// module.exports = async (req, res, next) => {
//    try{
    
//   const dataObj =await User.findOne({ username: req.body.username })
//    if (dataObj) {
//       if (await bcrypt.compare(req.body.password, dataObj.password)) {
//          next();
//       } else {
//          res.status(401).send({status:variable_status.responess_date.fail})
//       } 
//    }else {
//       res.status(401).send({status:variable_status.responess_date.fail})
//    }
//    }catch(e){
//       console.log(e)
//       res.send(e)
//    }
      //  if(req.body.username === "kennaruk" && 
      //     req.body.password === "mak") 

      //     next();
      //  else res.send("Wrong username and password") 
      //ถ้า username password ไม่ตรงให้ส่งว่า Wrong username and password
   // }





