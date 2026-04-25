require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const dbConection = require('./config/dbCoection')
//middleware
app.use(express.json())
app.use(cors())


//database
dbConection()

app.get('/hello', (req,res)=> {
  res.send('hello devlopers')
})


const port = process.env.PORT || 8000

app.listen(port, ()=> {
  console.log(`server running on ${port}`);
  
})