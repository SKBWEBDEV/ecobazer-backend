const mongoose = require("mongoose");


const dbConection = async () => {

  try {

    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Database connected");


  } catch (error) {

    console.log("Database connection failed:", error.message);

    process.exit(1);

  }

};


module.exports = dbConection;