const express = require("express");

const router = express.Router();

const adminAuth = require("../middleware/adminMiddleware");

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controlers/adminOrderController");


// Get all orders (Admin)
router.get(
  "/",
  adminAuth,
  getAllOrders
);


// Update order status (Admin)
router.put(
  "/:id",
  adminAuth,
  updateOrderStatus
);


module.exports = router;