const mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId
    ref: "Category", // Reference to the Category model
    required: true,
  },
  sub_category_name: {
    type:String,
    required:true,
  },
 
  images: [String],

})

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;