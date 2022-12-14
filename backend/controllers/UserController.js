const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Aunthentictaion of users
//@route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  //initialize the value that you need from the frontend....
  const { name, email, password } = req.body;
  //confirm if all the fieldset contain values
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please fill all the fields   ");
  }

  //checkif user exists, iuf such email is found in the database, notify the user
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("The email already registered");
  }

  //hash the password ----for security purposes
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //creating the user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  //if user has entered data the right way, then send OK message
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
  //declare the fieldset you need to be field
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
const getMe = asyncHandler(async (req, res) => {
  //initialize the auth that will help to identify the data of current user
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//generate a token JWT
const generateToken = (id) => {
  //keeps user in cache memory for the next 30 days, thhen you will have to login against
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//export all the functions
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
