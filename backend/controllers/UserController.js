const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Aunthentictaion of users
//@route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please fill all the fields   ");
  }

  //checkif user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("The email already registered");
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //creating the user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("INVALID data");
  }
});

//@desc Aunthentictaion of users
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking is user is in db
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("INVALID credentials");
  }
});

//@desc Get User Data
//@route GET  /api/users/getme
//@access Public
const getMe = (req, res) => {
  res.status(200).json({ message: "get users data" });
};

//generate a token JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
