const Category = require('../models/categoryModels');
const addCategory = async(req, res)=>{
  try {
    const {categoryName} = req.body;
    const images = req.file.path;
    const category= await Category.create({
      categoryName,
      images
    });
    return res.status(200).json({
      success:true,
      message:"food item added successfully",
      data:category
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
}
                                     
const getAllCtegory = async(req, res)=>{
  try {
    const category = await Category.find();
   return res.status(200).json({
    success:true,
    message:"Category fetch successfully",
    data:category
   })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}           

const updateCategory = async(req, res)=>{
  try {
    const categoryId = req.params.id;
    const category = await Category.findOneAndUpdate({_id:categoryId});
    if(!category)return res.status(400).json({
      success:false,
      message:"Category does not found!"
    });
    return res.status(200).json({
      success:true, 
      message:"Category updated successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


module.exports = {addCategory, getAllCtegory, updateCategory}