const express = require('express');
const { addInnerSubcategories, singleInnerSubcategories, viewInnerSubcategory } = require('../controllers/subCategory');
const upload = require('../middleware/image');
const router = express.Router();


//routes
router.post("/add", addInnerSubcategories);
router.get("/single/:id", singleInnerSubcategories);
router.get("/view/:id", viewInnerSubcategory);

module.exports = router;