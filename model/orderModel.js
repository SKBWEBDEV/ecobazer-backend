const mongoose = require("mongoose");

const { Schema } = mongoose;


const orderModel = new Schema(
{

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },


  products:[

    {

      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
      },


      title:{
        type:String,
        required:true
      },


      price:{
        type:Number,
        required:true
      },


      sku:{
        type:String
      },


      quantity:{
        type:Number,
        required:true
      },


      totalPrice:{
        type:Number,
        required:true
      }

    }

  ],



status: {
  type: String,
  enum: [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ],
  default: "pending",
},

},
{
 timestamps:true
});


module.exports = mongoose.model(
  "Order",
  orderModel
);