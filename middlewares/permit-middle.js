const jwt = require("jsonwebtoken");

module.exports.permit = (permittedRoles)=> {
    // return a middleware
    return (req, res, next) => {
      // const { role } = req.body
      let user
      let hello
try{
       hello = req.headers.authorization.replace('Bearer ', '')
       console.log(req.headers.authorization.replace('Bearer ', ''))
       user = jwt.verify(hello, "MY_SECRET_KEY");
    }catch(e){
      console.log(e)
    }
      console.log(user)
      try{
      if (user.role && permittedRoles.includes(user.role)) {
        req.user = user
        next(); // role is allowed, so continue on the next middleware
      } else {
        
        res.status(200).json({message: "Forbidden"}); // user is forbidden
      }
    }catch(e){
      res.status(200).json({message: "Forbiddezn"})
    }
    }
  }