const Order = require("../model/orderModel");


// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      orders,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;


    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );


    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }


    res.status(200).json({
      success: true,
      order,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



module.exports = {
  getAllOrders,
  updateOrderStatus,
};