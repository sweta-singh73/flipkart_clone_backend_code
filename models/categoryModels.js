const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  categoryName:{
    type:String,
    required:true,
  },
images:[String]
},
{
  timestamps:true
}
);

const Category = mongoose.model("category", categorySchema );
module.exports = Category;