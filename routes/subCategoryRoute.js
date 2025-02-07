const express = require('express');
const { subcategoryAdd, listSubcategory, singleSubcategory } = require('../controllers/subCategory');
const upload = require('../middleware/image');
const verifyToken = require('../middleware/auth');
const { authorizedRole } = require('../middleware/authorizedRole');

const router = express.Router();

//routes 
router.post("/add", verifyToken, authorizedRole(["admin"]), upload.single("images"), subcategoryAdd );
router.get("/list", listSubcategory);
router.get("/single/:id", singleSubcategory);




module.exports = router;