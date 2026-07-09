const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

const createCart = async (req, res) => {
  const { proid, userId } = req.body;

  const product = await Product.findById(proid);
  if (!product) {
    return res.json({ success: false, message: "Product Not Found" });
  }

  let cartItem = await Cart.findOne({ product: proid, user: userId });

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cartItem = new Cart({
      product: proid,
      user: userId,
      quantity: 1,
    });
  }

  cartItem.totalPrice = product.price * cartItem.quantity;
  await cartItem.save();

  res.json({ success: true, message: "Cart updated" });
};



const increDecre = async (req, res) => {
  const { id } = req.params;
  const { type, userId } = req.body;

  try {
    let cartItem = await Cart.findOne({ product: id, user: userId }).populate("product");

    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    if (type === "plus") {
      cartItem.quantity += 1;
    } else if (type === "minus" && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    cartItem.totalPrice = cartItem.product.price * cartItem.quantity;
    await cartItem.save();

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const proDelete = async (req, res) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete({ _id:id });

  res.json({
    success: true,
    message: "Product Deleted",
  });
};

const getCart = async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.find({ user: userId }).populate("product");

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);

  res.json({
    cart,
    totalPrice,
  });
};

module.exports = { createCart, increDecre, proDelete, getCart };
