const jwt = require("jsonwebtoken");


const tokenGenerator = (data, secret, expire)=>{


if(!secret){

throw new Error(
"JWT secret missing"
);

}



return jwt.sign(

data,

secret,

{
expiresIn:expire
}

);


};



module.exports={
tokenGenerator
};