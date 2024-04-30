const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    try {
      // console.log("Decoded token data: ", decoded);
      const user = await User.findById(decoded.id).exec(); // Fetch user details from the database
      req.user = user;
      next();
    } catch (error) {
      console.log("Error fetching user from database:", error);
      return res.sendStatus(500); // Internal Server Error
    }
  });
}

module.exports = authenticateToken;
