const emptyFieldValidation = (...fields) => {

  const isEmpty = fields.some(
    field => field === undefined || field === null || field === ""
  );


  return isEmpty;

};


module.exports = {
  emptyFieldValidation
};