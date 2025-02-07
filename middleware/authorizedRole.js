const authorizedRole = (allowedRoles) => {
  return (req, res, next) => {
    console.log("User Object in Middleware:", req.user); // ✅ Debug log

    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
};

module.exports = { authorizedRole };
