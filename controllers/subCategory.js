const Category = require('../models/categoryModels');
const SubCategory = require('../models/subCategoryModel');
const InnerSubCategory = require('../models/innerSubCategoryModel');
const mongoose = require("mongoose");
const Product = require('../models/productModel');

//add sub category******************************************************************** 
const subcategoryAdd = async (req, res) => {
  try {
    const cleanedBody = Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [key.trim(), value])
    );
    console.log("req.body", req.body)
    const { category_id, sub_category_name } = cleanedBody;

    console.log("Received category_id:", category_id); // Debugging log

    // Ensure category_id is received
    if (!category_id) {
      return res.status(400).json({ error: "Category ID is required!" });
    }

    // Check if category_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      console.log("Invalid category ID:", category_id);
      return res.status(400).json({ error: "Invalid category ID format!" });
    }

    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ error: "Category not found!" });
    }


    const subCategory = new SubCategory({
      category_id,
      sub_category_name,
      
    });

    await subCategory.save();

    console.log("Subcategory created:", subCategory);
    return res.status(201).json({
      message: "Subcategory added successfully!",
      data: subCategory,
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

//get all subcategory************************************************* 
const listSubcategory = async(req, res)=>{
  try {
    const subcategory =await SubCategory.find();
    if(!subcategory)return res.status(400).json({error:"subcategory is not found!"});

    return res.status(200).json({message:"subcategory fetch successfully", data:subcategory});
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
}


//fetch all innersubcategory through single subcategory id************************************ 
const singleSubcategory = async(req, res)=>{
  try {
    const subcategoryId = req.params.id;
   const innerSubcategory = await InnerSubCategory.find({subcategory_id:subcategoryId})
    
   if(!innerSubcategory)return res.status(400).json({error:"inner subcategory not found!"});
   return res.status(200).json({message:"Inner subcategory fetch successfully!", data:innerSubcategory});
  } catch (error) {
  
  }
}

// add innersubcategory........................................
const addInnerSubcategories = async(req, res)=>{

  try {

    const cleanedBody = Object.fromEntries(
      Object.entries(req.body).map(([key, value]) => [key.trim(), value])
    );

    console.log("req.body", req.body)
    const { subcategory_id, innerSubCategoryName } = cleanedBody;
    console.log("clean body", cleanedBody)

    console.log("subcategory id", subcategory_id)
    // Ensure category_id is received
    if (!subcategory_id) {
      return res.status(400).json({ error: "Subcategory ID is required!" });
    }

    // Check if category_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(subcategory_id)) {
      return res.status(400).json({ error: "Invalid subcategory ID format!" });
    }


    const subcategory = await SubCategory.findOne({_id:subcategory_id});
    if(!subcategory)return res.status(400).json({error:"Subcategory not found!"});

    const innerSubcategory = await InnerSubCategory.create({
      subcategory_id,
      innerSubCategoryName,
   
    })
    
    return res.status(200).json({message: "inner subcategory added successfully!", data:innerSubcategory}); 

  } catch (error) {
    return res.status(500).json({error:error.message});
  }
} 


const singleInnerSubcategories = async (req, res) => {
  try {
    const innerSubcategory_id = req.params.id;
    let { page, limit } = req.query;

    // Convert page and limit to numbers with default values
    page = parseInt(page) || 1;  // Default to page 1
    limit = parseInt(limit) || 10; // Default to 6 products per page
    const skip = (page - 1) * limit; // Calculate items to skip

    // Fetch paginated products
    const products = await Product.find({ innerCategory_id: innerSubcategory_id })
      .skip(skip)
      .limit(limit);

    // Count total products in this inner subcategory
    const totalProducts = await Product.countDocuments({ innerCategory_id: innerSubcategory_id });

    if (!products.length) {
      return res.status(404).json({ error: "No products found!" });
    }

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



module.exports = { subcategoryAdd, listSubcategory, addInnerSubcategories, singleSubcategory, singleInnerSubcategories };

