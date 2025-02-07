const InnerSubCategory = require('../models/innerSubCategoryModel');
const Product = require('../models/productModel');
const addProduct = async (req, res)=>{
  try {
  
    const {innerCategory_id, product_name,product_price, discount, size} = req.body;
    const images = req.file.path;

    //check category id existance 
    const innerSubcategory = await InnerSubCategory.findOne({_id:innerCategory_id})
    if(!innerSubcategory)return res.status(400).json({success:false, message:"inner subcategory not found!"});
    const product = await Product.create({
      innerCategory_id,
      product_name,
      product_price,
      discount,
      size,
      images
    });
    console.log("food", product)
    return res.status(200).json({
      success:true,
      message:"Food added successfully",
      data:product
    });
  } catch (error) {
   return res.status(500).json({
    success:false,
    message:error.message
   }); 
  }
}
const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productItems = await Product.findById({_id:productId});

    if(!productItems)return res.status(400).json({error:"product not found!"});
    return res.status(200).json({message:"product fetch successfully!", data:productItems});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// top offer product api 

const topOffers = async(req, res)=>{
  try {
    const product = await Product.find({
                                           
    })
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
}



module.exports = {addProduct, getSingleProduct}