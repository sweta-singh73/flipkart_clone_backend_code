const { securePassword, createToken } = require('../helpers/helpers');
// const { handleValidation } = require('../helpers/validation');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const signUp = async (req, res) => {
  try {

    const { name, username, email, phone, password } = req.body;
    //handle the validation request of body
      //  const validationErr = await handleValidation(
      //       { name, username, email, phone, password },
      //       res
      //     );
      //     if (validationErr) return validationErr;
    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashPassword = await securePassword(password);
    
    // Create new user instance
    const userData = new User({
      name,
      email,
      password: hashPassword,
      phone,
      username,
    });

    // Save user data to the database
    const userDetails = await userData.save();
    
    // Send success response
    return res.status(200).json({
      success: true,
      message: "User signed up successfully",
      data: userDetails,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//login function 
const logIn = async (req, res)=>{
  try {
   const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(409).json({
      success: false,
      message: "User already exists",
    });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch)return res.status(401).json({
      success:true,
      message:"Please enter valid email and password"
    });
    const token = await createToken(user._id);
    const userDetails = {
      _id:user._id,
      name:user.name,
      token:token
    }
   return res.status(200).json({
    success:true,
    message:"User login successfully",
    data:userDetails
   })

  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { signUp, logIn };
