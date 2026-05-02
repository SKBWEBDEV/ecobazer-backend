const User = require("../model/userModel");
const { mailVerifycation } = require("../utils/email");
const { emptyFieldValidation } = require("../utils/validation");
const tokenGenerator = require("../utils/tokenGenerator");
const existingData = require("../utils/existingData");

let registationControler = async (req, res) => {
  const { email, password, confirmPassword, terms } = req.body;

  let existingUser = await User.findOne({emai:email});
     
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

  let user = new User({
    email: email,
    password: password,
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

module.exports = { registationControler };
