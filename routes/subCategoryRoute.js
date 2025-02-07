const express = require('express');
const { subcategoryAdd, listSubcategory, singleSubcategory } = require('../controllers/subCategory');
const upload = require('../middleware/image');

const router = express.Router();

//routes 
router.post("/add", upload.single("images"), subcategoryAdd );
router.get("/list", listSubcategory);
router.get("/single/:id", singleSubcategory);




module.exports = router;