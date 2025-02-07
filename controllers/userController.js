const User = require('../models/userModel');


const getAllUser = async(req,res)=>{
  try {    
    const user = await User.find()
    if(!user)return res.status(400).json({
      success:false,
      message:"User not found!"
    });

    return res.status(200).json({
      success:true,
      message:"User fetch successfully",
      data:user
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

const updateUser = async(req, res)=>{
  try {
    const userId = req.user._id;
    const updateData = {
      name:req.body.name,
      username:req.body.username,
      phone:req.body.phone,
    }
    const user = await User.findByIdAndUpdate({_id:userId}, updateData);
    if(!user)return res.status(400).json({success:false, message:"User does not exist!"});
    return res.status(200).json({
      success:true,
      message:"User update successfully"

    });


  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
}


module.exports = {getAllUser, updateUser}