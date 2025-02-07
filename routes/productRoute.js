const express = require('express');
const upload = require('../middleware/image');
const { addProduct, getSingleProduct } = require('../controllers/productController');

const router = express.Router();



//routes
router.post("/add",upload.single("images"), addProduct);
router.get("/single/:id", getSingleProduct);



module.exports = router;