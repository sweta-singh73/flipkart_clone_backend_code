const mongoose = require('mongoose');
const subCategorySchema = new mongoose.connect({
  category_id: {
    type:String,
    required:true,
  },
  sub_category_name: {
    type:String,
    required:true,
  },
  
})