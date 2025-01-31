let bcrypt = require('bcrypt');
let JWT = require('jsonwebtoken');
let JWT_SECRET_KEY = require('dotenv')

// secure password
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }
    catch (error) {
        return { error: error.message }
    }
}

// create token
let createToken =  (id) => {
    try {
        let token = JWT.sign({ _id: id }, process.env.JWT_SECRET_KEY);
        return token;
    }
    catch (error) {
        return { error: error.message };
    }
}


module.exports = {
    securePassword,
    createToken
}
