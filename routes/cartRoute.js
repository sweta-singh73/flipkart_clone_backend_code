const express = require('express');
const { addToCart, cartList, singleCartItem, removeCartItems } = require('../controllers/cartController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

//routes
router.post("/add", verifyToken, addToCart);
router.get("/list", cartList);
router.get("/single", verifyToken, singleCartItem);
router.delete("/remove/:id", verifyToken, removeCartItems);

module.exports = router;