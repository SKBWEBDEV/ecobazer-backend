const mongoose = require("mongoose");

const { Schema } = mongoose;


const userSchema = new Schema({

  firstName:{
    type:String,
    trim:true
  },

  lastName:{
    type:String,
    trim:true
  },


  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },


  password:{
    type:String,
    required:true
  },


  phoneNumber:{
    type:String
  },


  terms:{
    type:Boolean,
    default:false
  },


  profile:{
    type:String,
    default:""
  },


  isVerify:{
    type:Boolean,
    default:false
  },


  role:{
    type:String,
    enum:[
      "admin",
      "user",
      "editor",
      "vendor"
    ],
    default:"user"
  },


  isHold:{
    type:Boolean,
    default:false
  },


  billingAddress:{

    firstName:String,

    lastName:String,

    email:String,

    companyName:String,

    street:String,

    state:String,

    zipCode:String,

    phone:String,

    country:String

  }


},
{
 timestamps:true
});


module.exports = mongoose.model(
"User",
userSchema
);