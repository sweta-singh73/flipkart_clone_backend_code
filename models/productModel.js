const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  innerCategory_id: {
     type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId
        ref: "InnerSubCategory", // Reference to the Category model
        required: true,
  },
  product_name:{
    type:String,
    required:true,
  },
  product_price:{
    type:Number,
    required:true,
  },
  images:[String],
  subImages: [String],
  product_status:{
    type:String,
    enum:["available", "sold"],
    default:"available",
  },
  discount:{
    type:String,
    required:true,
  },
  size: [String]
   

},
{
  timestamps:true
});


const Product = mongoose.model("Product", productSchema);
module.exports = Product;