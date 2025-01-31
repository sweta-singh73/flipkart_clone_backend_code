const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
  categoryId:{
type:String,
required:true,
  },
  foodName:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  images:[String]

},
{
  timestamps:true
}
);
const Food = mongoose.model("food", foodSchema);
module.exports = Food;