const express = require("express");
const router = express.Router();

const auth = require("../middleware/secureMiddleWare");

const {
  getMyOrders,
  getSingleOrder,
} = require("../controlers/orderController");

router.get("/my-orders", auth, getMyOrders);

router.get("/:id", auth, getSingleOrder);

module.exports = router;
