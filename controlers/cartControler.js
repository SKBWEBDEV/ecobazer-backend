const Cart = require("../model/cartModel");
const Product = require("../model/productModel");



// Add to cart

const createCart = async (req,res)=>{

try{


const {proid,userId}=req.body;



if(!proid || !userId){

return res.status(400).send({

success:false,

message:"Product id and user id required"

});

}





const product = await Product.findById(proid);



if(!product){

return res.status(404).send({

success:false,

message:"Product not found"

});

}





let cartItem = await Cart.findOne({

product:proid,

user:userId

});





if(cartItem){


cartItem.quantity += 1;



}else{


cartItem = new Cart({

product:proid,

user:userId,

quantity:1,

totalPrice:product.price

});


}





cartItem.totalPrice = product.price * cartItem.quantity;



await cartItem.save();





res.status(200).send({

success:true,

message:"Cart updated"

});





}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}


};









// Increase / Decrease quantity


const increDecre = async(req,res)=>{


try{


const {id}=req.params;

const {type,userId}=req.body;




if(!userId || !type){

return res.status(400).send({

success:false,

message:"User id and type required"

});

}





const cartItem = await Cart
.findOne({

product:id,

user:userId

})
.populate("product");





if(!cartItem){

return res.status(404).send({

success:false,

message:"Cart item not found"

});

}





if(!cartItem.product){

return res.status(404).send({

success:false,

message:"Product not found"

});

}





if(type==="plus"){


cartItem.quantity += 1;



}else if(type==="minus"){


if(cartItem.quantity<=1){

return res.send({

success:false,

message:"Minimum quantity is 1"

});

}


cartItem.quantity -=1;



}else{


return res.status(400).send({

success:false,

message:"Invalid type"

});


}





cartItem.totalPrice = 
cartItem.product.price * cartItem.quantity;



await cartItem.save();





res.send({

success:true,

message:"Cart updated"

});





}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}


};









// Delete cart item


const proDelete = async(req,res)=>{


try{


const {id}=req.params;



const cart = await Cart.findByIdAndDelete(id);



if(!cart){

return res.status(404).send({

success:false,

message:"Cart item not found"

});

}




res.send({

success:true,

message:"Product deleted from cart"

});




}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}


};









// Get user cart


const getCart = async(req,res)=>{


try{


const {userId}=req.params;




const cart = await Cart
.find({
user:userId
})
.populate("product");





const totalPrice = cart.reduce(

(sum,item)=>{

if(item.product){

return sum + item.totalPrice;

}

return sum;

},

0

);





res.send({

success:true,

cart,

totalPrice

});





}catch(error){


res.status(500).send({

success:false,

message:error.message

});


}


};







module.exports={

createCart,

increDecre,

proDelete,

getCart

};