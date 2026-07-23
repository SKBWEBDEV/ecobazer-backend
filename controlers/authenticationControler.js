const User = require("../model/userModel");
const { mailVerifycation, resetPasswordEmail } = require("../utils/email");
const { tokenGenerator } = require("../utils/tokenGenerator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Registration

const registationControler = async (req, res) => {

  try {

    const { email, password, confirmPassword, terms } = req.body;


    if (!email || !password || !confirmPassword || !terms) {
      return res.status(400).send({
        success:false,
        message:"All fields are required"
      });
    }


    const existingUser = await User.findOne({email});


    if(existingUser){
      return res.status(409).send({
        success:false,
        message:"User already exists"
      });
    }



    if(password !== confirmPassword){

      return res.status(400).send({
        success:false,
        message:"Passwords do not match"
      });

    }



    const hash = await bcrypt.hash(password,10);



    const user = new User({

      email,
      password:hash,
      terms

    });



    await user.save();



    const token = tokenGenerator(
      {
        id:user._id,
        email:user.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      "1d"
    );



    await mailVerifycation(email,token);



    res.status(201).send({

      success:true,
      message:"Registration successful. Please verify your email"

    });



  }catch(error){

    res.status(500).send({

      success:false,
      message:error.message

    });

  }

};






// Login

const loginControler = async(req,res)=>{


try{


const {email,password}=req.body;



if(!email || !password){

return res.status(400).send({

success:false,
message:"All fields are required"

});

}



const existingUser = await User.findOne({email});



if(!existingUser){

return res.status(404).send({

success:false,
message:"User not found"

});

}




const pass = await bcrypt.compare(
password,
existingUser.password
);



if(!pass){

return res.status(401).send({

success:false,
message:"Invalid credential"

});

}




const token = tokenGenerator(

{
id:existingUser._id,
email:existingUser.email,
role:existingUser.role
},

process.env.ACCESS_TOKEN_SECRET,

"1d"

);




res.send({

success:true,
message:"Login successful",

token,


user:{


id:existingUser._id,

email:existingUser.email,

role:existingUser.role,

isVerify:existingUser.isVerify


}


});



}catch(error){

res.status(500).send({

success:false,
message:error.message

});

}


};







// Forgot password


const forgotPasswordControler = async(req,res)=>{


try{


const {email}=req.body;



if(!email){

return res.status(400).send({

success:false,
message:"Email required"

});

}



const user = await User.findOne({email});



if(!user){

return res.status(404).send({

success:false,
message:"Email not found"

});

}



const token = tokenGenerator(

{
id:user._id,
email:user.email
},

process.env.ACCESS_TOKEN_SECRET,

"10m"

);



await resetPasswordEmail(email,token);



res.send({

success:true,
message:"Please check your email"

});



}catch(error){


res.status(500).send({

success:false,
message:error.message

});


}


};








// Reset password


const resetpasswordControler = async(req,res)=>{


try{


const {newPassword,confirmPassword}=req.body;


if(!newPassword || !confirmPassword){

return res.status(400).send({

success:false,
message:"All fields are required"

});

}




if(newPassword !== confirmPassword){

return res.status(400).send({

success:false,
message:"Password not match"

});

}



const {token}=req.params;



jwt.verify(
token,
process.env.ACCESS_TOKEN_SECRET,
async(err,decoded)=>{


if(err){

return res.status(401).send({

success:false,
message:"Unauthorized"

});

}



const hash = await bcrypt.hash(newPassword,10);



await User.findByIdAndUpdate(

decoded.id,

{
password:hash
}

);



res.send({

success:true,
message:"Password updated successfully"

});


}

);



}catch(error){


res.status(500).send({

success:false,
message:error.message

});


}


};









// Resend verification email


const resendVerifycationEmailControler = async(req,res)=>{


try{


const {email}=req.body;



const user = await User.findOne({email});



if(!user){

return res.status(404).send({

success:false,
message:"User not found"

});

}



if(user.isVerify){

return res.send({

success:false,
message:"Email already verified"

});

}




const token = tokenGenerator(

{
id:user._id,
email:user.email
},

process.env.ACCESS_TOKEN_SECRET,

"1d"

);



await mailVerifycation(email,token);



res.send({

success:true,
message:"Verification email sent"

});



}catch(error){


res.status(500).send({

success:false,
message:error.message

});


}


};










// Verify email


const verifyemailControler = async(req,res)=>{


try{


const {token}=req.params;



jwt.verify(

token,

process.env.ACCESS_TOKEN_SECRET,

async(err,decoded)=>{


if(err){

return res.status(401).send({

success:false,
message:"Unauthorized"

});

}



const user = await User.findById(decoded.id);



if(!user){

return res.status(404).send({

success:false,
message:"User not found"

});

}



if(user.isVerify){

return res.send({

success:false,
message:"Email already verified"

});

}



user.isVerify=true;


await user.save();



res.send({

success:true,
message:"Email verified successfully"

});



}


);



}catch(error){


res.status(500).send({

success:false,
message:error.message

});


}


};







module.exports={

registationControler,

loginControler,

forgotPasswordControler,

resetpasswordControler,

resendVerifycationEmailControler,

verifyemailControler

};