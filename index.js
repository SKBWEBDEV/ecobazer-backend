const express = require('express')
const app = express()
app.use(express.json())


app.get('/hello', (req,res)=> {
  res.send('hello devlopers')
})


app.listen(5000, ()=> {
  console.log(`server running on 5000`);
  
})