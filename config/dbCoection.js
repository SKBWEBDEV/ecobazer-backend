const mongoose  = require('mongoose')

const dbConection = ()=> {
  mongoose.connect(process.env.DATABASE_URL).then(()=> {
    console.log('database conected');
  })
}

module.exports = dbConection