const axios=require("axios");
const Cart=require("../model/cartModel");
const Order=require("../model/orderModel");


const paymentControler=async(req,res)=>{

try{

const userId=req.user.id;


const {
cus_name,
cus_email,
cus_phone,
cus_add1,
cus_add2,
cus_city,
cus_state,
cus_postcode,
cus_country
}=req.body;


if(!cus_name || !cus_email || !cus_phone){

return res.status(400).send({
success:false,
message:"Customer information required"
});

}



const cart=await Cart.find({
user:userId
}).populate("product");



if(cart.length===0){

return res.status(404).send({
success:false,
message:"Cart is empty"
});

}



const products=[];


cart.forEach(item=>{

if(item.product){

products.push({

product:item.product._id,

title:item.product.title,

price:item.product.price,

sku:item.product.sku,

quantity:item.quantity,

totalPrice:item.product.price*item.quantity

});

}

});



if(products.length===0){

return res.status(400).send({
success:false,
message:"No valid product found"
});

}



const totalPrice=products.reduce(
(sum,item)=>sum+item.totalPrice,
0
);



const tran_id=Date.now().toString();



const paymentData={

store_id:process.env.AAMARPAY_STORE_ID,

signature_key:process.env.AAMARPAY_SIGNATURE_KEY,

tran_id,

amount:totalPrice,

currency:"BDT",

cus_name,

cus_email,

cus_phone,

cus_add1,

cus_add2,

cus_city,

cus_state,

cus_postcode,

cus_country,

success_url:`${process.env.FRONTEND_URL}/success`,

fail_url:`${process.env.FRONTEND_URL}/fail`,

cancel_url:`${process.env.FRONTEND_URL}/cancel`,

desc:"EcoBazer Product Payment",

type:"json"

};



const response=await axios.post(
"https://sandbox.aamarpay.com/jsonpost.php",
paymentData
);



const order=new Order({

user:userId,

products,

totalPrice,

tranid:tran_id,

status:"pending"

});


await order.save();



res.status(200).send({

success:true,

message:"Payment initiated successfully",

payment:response.data,

orderId:order._id

});


}catch(error){

console.log(
error.response?.data || error.message
);


res.status(500).send({

success:false,

message:error.response?.data || error.message

});


}

};

const paymentSuccess = async(req,res)=>{

try{

const userId = req.user.id;

await Cart.deleteMany({
  user:userId
});


await Order.findOneAndUpdate(
  {
    user: userId,
    paymentStatus: "pending",
  },
  {
    paymentStatus: "paid",
  },
  {
    new: true,
  }
);


res.send({

success:true,

message:"Payment completed"

});


}catch(error){

res.status(500).send({

success:false,

message:error.message

});

}

};



module.exports={paymentControler,paymentSuccess};