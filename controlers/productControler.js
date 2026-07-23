const Product = require("../model/productModel");



// Create Product

const createProductController = async (req,res)=>{

try{


const {
title,
price,
category,
stock
}=req.body;



if(!title || price === undefined || !category){

return res.status(400).send({

success:false,

message:"Title, price and category are required"

});

}




const existingTitle = await Product.findOne({
title
});


if(existingTitle){

return res.status(409).send({

success:false,

message:"Title already exists"

});

}




const sku = `${Date.now()}-${new Date().getFullYear()}`;



const product = new Product({

...req.body,

sku

});



await product.save();



res.status(201).send({

success:true,

message:"Product created successfully",

data:product

});




}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}

};









// Get All Product


const allPrduct = async(req,res)=>{


try{


const {
title,
category
}=req.query;



let filter={};



if(title){

filter.title={

$regex:title,

$options:"i"

};

}




if(category){

filter.category=category;

}





const products = await Product.find(filter)
.sort({
createdAt:-1
});




res.status(200).send({

success:true,

data:products

});





}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}


};









// Single Product


const singleProduct = async(req,res)=>{


try{


const {id}=req.params;



const product = await Product.findById(id);



if(!product){

return res.status(404).send({

success:false,

message:"Product not found"

});

}



res.status(200).send({

success:true,

data:product

});





}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}


};









// Delete Product


const deleteProduct = async(req,res)=>{


try{


const {id}=req.params;



const product = await Product.findByIdAndDelete(id);



if(!product){

return res.status(404).send({

success:false,

message:"Product not found"

});

}



res.status(200).send({

success:true,

message:"Product deleted successfully"

});




}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}


};









// Update Product


const updateProduct = async(req,res)=>{


try{


const {id}=req.params;



const product = await Product.findByIdAndUpdate(

id,

req.body,

{

new:true,

runValidators:true

}

);




if(!product){

return res.status(404).send({

success:false,

message:"Product not found"

});

}





res.status(200).send({

success:true,

message:"Product updated successfully",

data:product

});





}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}


};








module.exports={

createProductController,

allPrduct,

singleProduct,

deleteProduct,

updateProduct

};