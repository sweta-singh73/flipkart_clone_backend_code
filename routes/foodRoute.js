const express = require('express');
const { addFood, GetFoodItems } = require('../controllers/foodController');
const upload = require('../middleware/image');
const router = express.Router();



//routes
router.post("/addfood",upload.single("images"), addFood);
router.get("/fooditems/:id", GetFoodItems );



module.exports = router;