require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbConection = require("./config/dbCoection");
const { registationControler, loginControler, forgotPasswordControler, resetpasswordControler,resendVerifycationEmailControler, verifyemailControler } = 
require("./controlers/authenticationControler");

const { rateLimit } = require ('express-rate-limit');

//controlers
const { allUserControler, singleUserControler, deleteUserControler, updateUserControler } = require("./controlers/userControler");

//product
const { allPrduct, singleProduct, deleteProduct, updateProduct } = require("./controlers/productControler");



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 5, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})

const limiter2 = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 5, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})
const limiter3 = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})
const limiter4 = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})
const limiter5 = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})
const limiter6 = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})


//middleware
app.use(express.json());
app.use(cors());
app.use(limiter)
//database
dbConection();

app.post("/registation",limiter,registationControler);
app.post("/login",limiter2,loginControler);
app.post("/forgotepassword",limiter3,forgotPasswordControler);
app.post("/resetpassword/:token",limiter4,resetpasswordControler);
app.post("/resendverifycationemail",limiter5,resendVerifycationEmailControler);
app.post("/verifyemail/:token",limiter6,verifyemailControler);


//product create
app.get("/allporduct", allPrduct)
app.get("/singleProduct/:id", singleProduct)
app.delete("/product/:id", deleteProduct)
app.put("/product/:id", updateProduct)



//order management


//user management
app.get("/alluser",allUserControler);
app.get("/singleuser/:id",singleUserControler);
app.delete("/deleteuser/:id",deleteUserControler);
app.post("/updateuser/:id",updateUserControler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
