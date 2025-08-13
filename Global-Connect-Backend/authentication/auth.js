// const jwt = require('jsonwebtoken')
// const User = require('../models/user')

// exports.auth = async (req, res, next) => {
//     try {
//         // const token = req.cookies.token;
//         //deploy
//         let token;

//         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//             token = req.headers.authorization.split(' ')[1];
//         }
//         // // 2. If not found, try reading from cookies
//         if (!token && req.cookies.token) {
//             token = req.cookies.token;
//         }

//         if(!token){
//             return res.status(401).json({ error: 'No token, authorization denied' });
//         }
//         const decode = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
//         req.user = await User.findById(decode.userId).select('-password');
//         next();


//     } catch (err) {
//         res.status(401).json({ error: 'Token is not valid' });
//     }
// }

const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.auth = async (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Try to get token from cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2️⃣ If not in cookies, try Authorization header
    else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 3️⃣ If not in header, try body (in case you send token from localStorage manually)
    else if (req.body?.token) {
      token = req.body.token;
    }

    // 4️⃣ No token found
    if (!token) {
      return res.status(401).json({ error: "No token provided, authorization denied" });
    }

    // 5️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    // 6️⃣ Attach user to req
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ error: "Token is invalid or expired" });
  }
};
