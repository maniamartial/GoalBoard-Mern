const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split("")[1];

      //verifiy the toekn

      const decode = jwt.verifiy(token, process.env.JWT_SECRET);

      //getting user from the token
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      consle.log(error);
      res.status(401);
      throw new Error("Not authorized, no available token found");
    }
});

module.exports = { protect };
