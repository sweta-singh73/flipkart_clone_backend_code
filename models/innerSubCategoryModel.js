const mongoose = require("mongoose");
const innerSubcategorySchema = new mongoose.Schema(
  {
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId
      ref: "SubCategory", // Reference to the Category model
      required: true,
    },
    innerSubCategoryName: {
      type: String,
      required: true,
    },
    images: [String],
  },
  {
    timestamps: true,
  }
);

const InnerSubCategory = mongoose.model(
  "innerSubcategory",
  innerSubcategorySchema
);
module.exports = InnerSubCategory;
