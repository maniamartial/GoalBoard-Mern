const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/UserController.js");

const { protect } = require("../middleware/authMiddleware");

//bring in the functionalities to register, login and get personal_data...
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

//export the API to the main server
module.exports = router;
