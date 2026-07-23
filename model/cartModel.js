const mongoose = require("mongoose");

const { Schema } = mongoose;


const cartSchema = new Schema(
{
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
  },


  quantity:{
    type:Number,
    min:1,
    required:true,
    default:1
  },


  totalPrice:{
    type:Number,
    required:true,
    default:0
  },


  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }

},
{
  timestamps:true
});


// Same user same product duplicate prevent
cartSchema.index(
  {
    product:1,
    user:1
  },
  {
    unique:true
  }
);


module.exports = mongoose.model(
  "Cart",
  cartSchema
);