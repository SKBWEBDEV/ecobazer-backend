const mongoose = require('mongoose')
const {Schema} = mongoose

const userModel = new Schema ({
  firsrtName:{
    type:String
  },
  lastNsme:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  phoneNumber:{
    type:String
  },
  terms:{
    type:Boolean
  },
  profile:{
    type:String
  },
  isVeryfi:{
    type:Boolean,
    default:false
  },
  role:{
    type:String,
    enum:["admin","user","editor","vendor"]
  },
  isHold:{
    type:Boolean,
    default:false
  },
  billingAddres:{
    firsrtName:{
    type:String
  },
  lastNsme:{
    type:String
  },
  email:{
    type:String
  },
  companyName:{
    type:String
  },
  street:{
    type:String
  },
  state:{
    type:String
  },
  zipCode:{
    type:String
  },
  phone:{
    type:String
  },
  country:{
    type:String
  }
  }

})

module.exports = mongoose.model('User',userModel)