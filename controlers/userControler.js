const User = require("../model/userModel");



// Get all users

const allUserControler = async (req, res) => {

  try {

    const userData = await User.find({});


    res.status(200).send({

      success: true,

      message: "All user data",

      userData

    });


  } catch (error) {


    res.status(500).send({

      success: false,

      message: error.message

    });


  }

};






// Get single user

const singleUserControler = async (req, res) => {

  try {


    const { id } = req.params;


    const userData = await User.findById(id);



    if (!userData) {

      return res.status(404).send({

        success: false,

        message: "User not found"

      });

    }



    res.status(200).send({

      success: true,

      message: "User data",

      userData

    });



  } catch (error) {


    res.status(500).send({

      success: false,

      message: error.message

    });


  }

};








// Delete user

const deleteUserControler = async (req, res) => {


  try {


    const { id } = req.params;



    const userData = await User.findByIdAndDelete(id);



    if (!userData) {

      return res.status(404).send({

        success:false,

        message:"User not found"

      });

    }



    res.status(200).send({

      success:true,

      message:"User deleted successfully"

    });



  } catch(error) {


    res.status(500).send({

      success:false,

      message:error.message

    });


  }


};









// Update user

const updateUserControler = async (req,res)=>{


  try{


    const {id}=req.params;



    const userData = await User.findByIdAndUpdate(

      id,

      req.body,

      {
        new:true,
        runValidators:true
      }

    );



    if(!userData){

      return res.status(404).send({

        success:false,

        message:"User not found"

      });

    }



    res.status(200).send({

      success:true,

      message:"User updated successfully",

      userData

    });



  }catch(error){


    res.status(500).send({

      success:false,

      message:error.message

    });


  }


};







module.exports = {

  allUserControler,

  singleUserControler,

  deleteUserControler,

  updateUserControler

};