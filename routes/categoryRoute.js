const express = require('express');
const upload = require('../middleware/image');
const { addCategory, getAllCtegory, singleCategory,  } = require('../controllers/categoryController');
const {authorizedRole} = require('../middleware/authorizedRole');
const verifyToken = require('../middleware/auth');
const router = express.Router();

//routes
// Add category route with middleware
router.post("/add", verifyToken, authorizedRole(["admin"]), upload.single("images"), addCategory);
router.get("/list", getAllCtegory);
router.get("/single/:id", singleCategory);

module.exports = router;