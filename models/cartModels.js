const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
  },
  product: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Ensure it matches your Product model name
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
},
{
  timestamps:true
}
)

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;