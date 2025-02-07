const Category = require('../models/categoryModels');
const SubCategory = require('../models/subCategoryModel');
const User = require('../models/userModel');

//add category************************************************************ 
const addCategory = async (req, res) => {
  try {
    //userId decoded through middleware
    const userId = req.user._id;
    console.log("User ID:", userId);

    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ success: false, error: "Category name is required." });
    }

    // Ensure an image is uploaded
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, error: "Category image is required." });
    }

    const imagePath = req.file.path;

    // Create the category
    const category = await Category.create({
      categoryName,
      images: imagePath
    });

    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: category
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message
    });
  }
};

      
//get all category list************************************************** 
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

//fetch all subcategory through single category id******************************************* 
const singleCategory = async (req, res)=>{
  try {
    const categoryId = req.params.id;
    const subCategory = await SubCategory.find({category_id:categoryId});
    if(!subCategory)return res.status(400).json({error:"subcategory not found!"});
    return res.status(200).json({message:"subcategory fetch successfully!", data:subCategory});
  } catch (error) {
    
  }
}

//update category*************************************************** 
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


module.exports = {addCategory, getAllCtegory, updateCategory, singleCategory}