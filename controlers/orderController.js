const Order = require("../model/orderModel");

// Get logged in user orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,

      orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,

      message: error.message,
    });
  }
};

// Get single order details

const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,

      user: req.user.id,
    }).populate("products.product");

    if (!order) {
      return res.status(404).send({
        success: false,

        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,

      order,
    });
  } catch (error) {
    res.status(500).send({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getMyOrders,

  getSingleOrder,
};
