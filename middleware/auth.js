const jwt = require("jsonwebtoken");


const config = process.env;

const verifyToken = (req, res, next) => {
   const token =
    req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     req.user = decoded;
    return next();
};


module.exports = verifyToken;