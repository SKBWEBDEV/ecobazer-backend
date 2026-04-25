const jwt = require('jsonwebtoken');

const secureMiddleWare = (req,res,next)=> {
  let token = req.headers.authorization
  // let data = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
  if (err) {
    res.send({message:"Unauthorized"})
  }else{
    next()
  }
});
}

module.exports = secureMiddleWare