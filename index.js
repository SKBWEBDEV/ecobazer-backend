require("dotenv").config();

console.log("INDEX STARTED");

const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();

const dbConection = require("./config/dbCoection");

const orderRoutes = require("./routes/orderRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const secureMiddleWare = require("./middleware/secureMiddleWare");

// Controllers

const {
  registationControler,
  loginControler,
  forgotPasswordControler,
  resetpasswordControler,
  resendVerifycationEmailControler,
  verifyemailControler,
} = require("./controlers/authenticationControler");


const {
  allUserControler,
  singleUserControler,
  deleteUserControler,
  updateUserControler,
} = require("./controlers/userControler");


const {
  createProductController,
  allPrduct,
  singleProduct,
  deleteProduct,
  updateProduct,
} = require("./controlers/productControler");


const {
  createCart,
  proDelete,
  increDecre,
  getCart,
} = require("./controlers/cartControler");


const {
  paymentControler,
  paymentSuccess,
} = require("./controlers/paymentControler");


// Rate Limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});


// Middleware

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(limiter);


// ================= AUTH =================

app.post("/register", registationControler);

app.post("/login", loginControler);

app.post("/forgot-password", forgotPasswordControler);

app.post("/reset-password/:token", resetpasswordControler);

app.post("/resend-verification", resendVerifycationEmailControler);

app.post("/verify-email/:token", verifyemailControler);


// ================= PRODUCT =================

app.post(
  "/products",
  secureMiddleWare,
  createProductController
);

app.get(
  "/products",
  allPrduct
);

app.get(
  "/products/:id",
  singleProduct
);

app.put(
  "/products/:id",
  secureMiddleWare,
  updateProduct
);

app.delete(
  "/products/:id",
  secureMiddleWare,
  deleteProduct
);


// ================= CART =================

app.post(
  "/cart",
  createCart
);

app.post(
  "/cart/update/:id",
  increDecre
);

app.get(
  "/cart/:userId",
  getCart
);

app.delete(
  "/cart/:id",
  proDelete
);


// ================= PAYMENT =================

app.post(
  "/payment",
  secureMiddleWare,
  paymentControler
);


app.post(
  "/payment/success",
  secureMiddleWare,
  paymentSuccess
);


// ================= USER =================

app.get(
  "/users",
  secureMiddleWare,
  allUserControler
);


app.get(
  "/users/:id",
  secureMiddleWare,
  singleUserControler
);


app.put(
  "/users/:id",
  secureMiddleWare,
  updateUserControler
);


app.delete(
  "/users/:id",
  secureMiddleWare,
  deleteUserControler
);


// ================= ORDERS =================

app.use(
  "/api/orders",
  orderRoutes
);


app.use(
  "/api/admin/orders",
  adminOrderRoutes
);


// ================= TEST =================

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "EcoBazer API Running",
  });

});


// ================= ERROR =================

app.use((err, req, res, next) => {

  console.log(err);

  res.status(500).json({
    success:false,
    message: err.message || "Server Error",
  });

});


// ================= SERVER =================

const PORT = process.env.PORT || 8000;


const startServer = async () => {

  try {

    await dbConection();

    app.listen(PORT, () => {

      console.log(`Server running on ${PORT}`);

    });


  } catch(error){

    console.log(error.message);

    process.exit(1);

  }

};


startServer();