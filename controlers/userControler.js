const User = require('../model/userModel')

let allUserControler = async(req,res)=> {

  const userData = await User.find({})
  res.send({
    message:"All user data",
    userData
  })
}

let singleUserControler = async(req,res)=> {

  let {id}=req.params

  const userData = await User.findById({id})
  res.send({
    message:`${userData.$assertPopulated.email} data`,
    userData
  })
}


let deleteUserControler = async (req,res)=> {
  let {id} = req.params
  let userData = await User.findByIdAndDelete({id})
  res.send({
    message:"user delete",
  })
}


let updateUserControler = async (req,res)=> {
  let {id} = req.params
  let userData = await User.findByIdAndUpdate({_id:id},req.body,{new:true})
  res.send({
    message:"user updated",
  })
}

module.exports = {allUserControler,singleUserControler,deleteUserControler,updateUserControler}