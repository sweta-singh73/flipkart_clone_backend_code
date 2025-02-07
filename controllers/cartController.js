const Cart = require("../models/cartModels");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const addToCart = async (req, res) => {
  try {
   

    if (!req.body.product || !req.body.product.product_id) {
      return res.status(400).json({ message: "productId is required" });
    }

    const user_id = req.user._id;
    const product_id = req.body.product.product_id;
    const newQuantity = req.body.product.quantity || 1; // Default to 1 if quantity is not provided

    let cartDetails = await Cart.findOne({ user_id });

    if (!cartDetails) {
      // If cart doesn't exist, create a new one
      let newCart = new Cart({
        user_id,
        product: [{ product_id, quantity: newQuantity }],
      });

      const response = await newCart.save();
      return res.status(200).json({ message: "Cart created!", data: response });
    }

    // Check if the product already exists in the cart
    let productExists = cartDetails.product.find(
      (item) => item.product_id.toString() === product_id
    );

    if (productExists) {
      // ✅ Update the quantity instead of adding a new product
      productExists.quantity += newQuantity;
    } else {
      // ✅ Add new product if it doesn't exist
      cartDetails.product.push({ product_id, quantity: newQuantity });
    }

    // ✅ Save the updated cart
    const updatedCart = await cartDetails.save();

    return res
      .status(200)
      .json({ message: "Item added/updated successfully", data: updatedCart });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};


//get cart items
const cartList = async (req, res) => {
  try {
    const cart = await Cart.find();
    if (!cart) return res.status(400).json({ error: "cart items not found!" });
    return res
      .status(200)
      .json({ message: "cart items fetch successfully!", data: cart });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const singleCartItem = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch the cart and populate product details
    const cartUser = await Cart.findOne({ user_id: userId }).populate({
      path: "product.product_id", // Corrected path (lowercase `product`)
      model: "Product", // Ensure this matches your Mongoose Product model
    });

    if (!cartUser) {
      return res.status(400).json({ error: "Cart details not found!" });
    }

    return res.status(200).json({
      message: "Cart items fetched successfully",
      data: cartUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const removeCartItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id; // Get product ID from params

    // Find the user's cart
    const cartDetails = await Cart.findOne({ user_id: userId });
    if (!cartDetails)
      return res.status(400).json({ error: "Cart details not found!" });

    // Filter out the product to delete
    const updatedProducts = cartDetails.product.filter(
      (item) => item.product_id.toString() !== productId
    );

    if (updatedProducts.length === 0) {
      // If no products left, delete the entire cart
      await Cart.findOneAndDelete({ user_id: userId });
      return res.status(200).json({ message: "Cart deleted successfully!" });
    }

    // Update the cart with the remaining products
    await Cart.findOneAndUpdate(
      { user_id: userId },
      { product: updatedProducts }
    );

    return res.status(200).json({ message: "Product removed successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



module.exports = { addToCart, cartList, singleCartItem, removeCartItems };
