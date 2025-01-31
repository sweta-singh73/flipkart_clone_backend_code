const Category = require('../models/categoryModels');
const Food = require('../models/foodModel');
const addFood = async (req, res)=>{
  try {
    const categoryId = req.body.categoryId; 
    const {foodName, price } = req.body;
    const images = req.file.path;

    //check category id existance 
    const category = await Category.findOne({_id:categoryId})
    if(!category)return res.status(400).json({success:false, message:"Category not found!"});
    const food = await Food.create({
      categoryId,
      foodName,
      price,
      images
    });
    console.log("food", food)
    return res.status(200).json({
      success:true,
      message:"Food added successfully",
      data:food
    });
  } catch (error) {
   return res.status(500).json({
    success:false,
    message:error.message
   }); 
  }
}
const GetFoodItems = async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Fetch food items that belong to the category
    const foodItems = await Food.find({categoryId});
    
    if (foodItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No food items found for this category!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food items fetched successfully",
      data: foodItems,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {addFood, GetFoodItems}