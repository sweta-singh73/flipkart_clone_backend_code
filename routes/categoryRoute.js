const express = require('express');

const upload = require('../middleware/image');
const { addCategory, getAllCtegory, singleCategory,  } = require('../controllers/categoryController');
const router = express.Router();

//routes
router.post("/add",upload.single("images"), addCategory);
router.get("/list", getAllCtegory);
router.get("/single/:id", singleCategory);

module.exports = router;