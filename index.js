require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbConection = require("./config/dbCoection");
const { registationControler, loginControler, forgotPasswordControler, resendVerifycationEmailControler } = require("./controlers/authenticationControler");



//middleware
app.use(express.json());
app.use(cors());



//database
dbConection();

app.post("/registation",registationControler);
app.post("/login",loginControler);
app.post("/forgotepassword",forgotPasswordControler);
app.post("/forgotpassword/:token",loginControler);
app.post("/resendverifycationemail",resendVerifycationEmailControler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
