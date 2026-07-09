const {emptyFieldValidation} = require('../utils/validation')
const Product = require('../model/productModel')

const createProductController = async(req,res)=> {
const {title,price,category} = req.body
emptyFieldValidation(res,title,price,category)

//title ki exist 
const existingTitle = await Product.findOne({ title });
if (existingTitle) {
  return res.send({
    message:"Title already exist"
  })
}

let sku = `${Date.now()}-${new Date().getFullYear()}`

let existSku = await Product.findOne({ sku });

if (existSku) {
  return res.send({
    message: "SKU already exists"
  });
}

let product = new Product ({
  ...req.body,
  sku:sku
})
await product.save()

res.json({
  success:true,
  message:"product Created"
})

}

//get all product
const allPrduct = async (req,res)=> {
  let {title} = req.body
  let products = await Product.find({title})
   res.json({
    success: true,
    data: products
  });
}

//get single product
const singleProduct = async (req,res)=> {
  let {id}= req.params
  let product = await Product.findOne({_id:id})
   res.send({
    success: true,
    data: product
  });
}

//delete product
const deleteProduct = async(req,res)=> {
  let {id} = req.params
  let deleteProduct = await Product.findByIdAndDelete(id);
    res.send({
    success: true,
    message: "Product deleted successfully"
  });
}

//update product
const updateProduct = async(req,res)=> {
  let {id} = req.params
  let updateProduct = await Product.findByIdAndUpdate(id);
   res.send({
    success: true,
    message: "Product update successfully"
  });
}



module.exports = {createProductController,allPrduct,singleProduct,deleteProduct,updateProduct}