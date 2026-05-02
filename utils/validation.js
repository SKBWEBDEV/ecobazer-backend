

const emptyFieldValidation = (res,...fields)=> {
  console.log(fields.includes(undefined));
  
    if (fields.includes(undefined) || fields.includes('')) {
    return res.send({ message: "All fields are required." });
  }
}

module.exports = {emptyFieldValidation}