const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema ({
  title:{
    type:String,
    unique:true,
    required:true
  },
  description:{
    type:String
  },
  price:{
    type:Number,
    required:true
  },
  discountPrice:{
    type:Number,
    min: 0,
    default: 0
  },
  additionalInformation:{
    type:String,
  },
  sku:{
    type:String,
    required:true,
    unique:true
  },
  stock:{
    type:Number,
    required:true
  },
  brand:{
    type:String
  },
  shortDescription:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required: true
  },
  subCategory:{
    type:String,
  },
  tag:[
    {
      type:String
    }
  ],
  status:{
    type:String,
    enum:["pending","active","inactive"],
    default:"pending"
  },
  images:[
    {
      url:{
        type:String,
        isMain:{
          type:Boolean,
          default:false
        }
      }
    }
  ]

},{timestamps: true})

module.exports = mongoose.model("Product", productSchema)