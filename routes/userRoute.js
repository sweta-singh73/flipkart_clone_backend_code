const express = require('express');
const { getAllUser, updateUser } = require('../controllers/userController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

router.get("/getuser", getAllUser);
router.put("/update",verifyToken, updateUser);



module.exports = router;