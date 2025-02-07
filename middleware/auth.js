const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Ensure you import the User model

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 🔹 Fetch user from DB to get role
    const user = await User.findById(decoded._id).select("-password"); // Exclude password

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user; // ✅ Attach full user object to req.user

    console.log(req.user, "req.user"); // ✅ Debugging log

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifyToken;
