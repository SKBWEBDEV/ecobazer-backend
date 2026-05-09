const User = require("../model/userModel");
const { mailVerifycation, resetPasswordEmail } = require("../utils/email");
const { emptyFieldValidation } = require("../utils/validation");
const {tokenGenerator} = require("../utils/tokenGenerator");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

let registationControler = async (req, res) => {
  const { email, password, confirmPassword, terms } = req.body;

  let existingUser = await User.findOne({email:email});
     
  if (existingUser) {
  return  res.send({message:"user already exists"})  
  }

  if (!terms) {
    return res.send("You must accept the terms and conditions.");
  }

  emptyFieldValidation(res, email, password, confirmPassword, terms);

  if (password !== confirmPassword) {
    res.send({ message: "Passwords do not match." });
  }

const hash = bcrypt.hashSync(password, 10);

  let user = new User({
    email: email,
    password: hash,
    terms: terms,
  });

  user.save();

  // let token = jwt.sign(
  //   {
  //     id: user._id,
  //     email: user.email,
  //   },
  //   process.env.ACCESS_TOKEN_SECRET,
  //   {
  //     expiresIn: "1d",
  //   },
  // );

 let token = tokenGenerator(
    {
      id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    "1d",
  );

  mailVerifycation(email, token);

  res.send({ message: "registation successfull" });
};


let loginControler = async(req,res) => {
  const { email, password } = req.body;

  let existingUser = await User.findOne({email:email});
     
  if (!existingUser) {
  return res.send({message:"user not found"})  
  }

  emptyFieldValidation(res, email, password);

 let pass =  bcrypt.compareSync(password, existingUser.password);
 if (!pass) {
  res.send({message:"invalid credential"})
 }else{
  res.send({message:"login successful"})
 }

}


let forgotPasswordControler = async(req,res)=> {
  let {email} = req.body
  let user = await User.findOne({email:email});
  
  emptyFieldValidation(res, email);

  if (!user) {
  return res.send({message:"email not found"})  
  }

   let token = tokenGenerator(
    {
      id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    "1d",
  );

  resetPasswordEmail(email,token)

  res.send({message:"Please check your email"})

}

let resetpasswordControler = async (req, res) => {

  // let user = await User.findOne({email:email});

  let { newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return res.send({ message: "ConfirmPassword not match" });
  }

  let { token } = req.params;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async function (err, decoded) {
    console.log(decoded);
    
    if (err) {
      res.send({ message: "Unauthorized" });
    } else {
      const hash = bcrypt.hashSync(newPassword, 10);
    const userData = await User.findOneAndUpdate(
    { _id: decoded.id },
    { password: hash },
    {new:true}
  );
    }
  
  });


// console.log(userData);

  res.send({ message: "password updated" });
};


let resendVerifycationEmailControler = async(req,res)=> {

  let {email} = req.body

  let user = await User.findOne({email:email})

  let token = tokenGenerator(
    {
      id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    "1d",
  );

  mailVerifycation(email,token)

  res.send({message:"Check your email varifycation"})

}


let verifyemailControler = async(req,res)=> {
  const {token} = req.params

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, async function(err,decoded){
    if (err) {
      res.send({message:"Unauthorized"})
    }else{
      const suerId = decoded.id
      let findUser =await User.findById(suerId)

      if (findUser.isVeryfi) {
        return res.send({message:"user already exist"})
      }else{
        findUser.isVeryfi = true
        findUser.save()
        res.send({message:"email verified successfully"})
      }
    }
  })

}




module.exports = { registationControler,loginControler,forgotPasswordControler,resetpasswordControler,resendVerifycationEmailControler, verifyemailControler};
