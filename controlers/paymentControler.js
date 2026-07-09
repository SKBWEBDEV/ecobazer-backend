const axios = require("axios");
const Cart = require("../model/cartModel");
const Order = require("../model/orderModel")

const paymentControler = async (req, res) => {
  try {
    const {  userId, cus_name, cus_email, cus_phone, cus_add1, cus_add2, cus_city, cus_state, cus_postcode, cus_country,} = req.body;

    const cart = await Cart.find({ user: userId }).populate("product");

    if (cart.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      }); 
    }

    const pro = [];

cart.forEach((item) => {
  pro.push({
    product: item.product._id,
    title: item.product.title,
    price: item.product.price,
    quantity: item.quantity,
    totalPrice: item.product.price * item.quantity,
  });
});

console.log(pro);


    const totalPrice = cart.reduce((total, item) => {
      return total + item.product.price * (item.quantity || 1);
    }, 0);



    const tran_id = Date.now().toString();

    const paymentData = {
      store_id: "aamarpaytest",
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",

      tran_id,

      amount: totalPrice,
      currency: "BDT",

      cus_name,
      cus_email,
      cus_phone,
      cus_add1,
      cus_add2,
      cus_city,
      cus_state,
      cus_postcode,
      cus_country,

      success_url: "http://localhost:5173/success",
      fail_url: "http://localhost:5173/fail",
      cancel_url: "http://localhost:5173/cancel",

      desc: "Product Payment",
      type: "json",
    };

    const response = await axios.post(
      "https://sandbox.aamarpay.com/jsonpost.php",
      paymentData,
    );

    const order = new Order({
    user: userId,
    products: pro,
    totalPrice,
    tranid:tran_id,
    status: "approved"
});

await order.save();

await Cart.deleteMany({ user: userId });

    res.status(200).json({
      success: true,
      payment: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { paymentControler };
