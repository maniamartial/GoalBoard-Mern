const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");
//Follow crude
//Extract data from db
//router.get("/", getGoals);
router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);
//user to post data
//router.post("/", setGoals);

//Updating data
//router.put("/:id", updateGoal);

//Delete specific data
//router.get("/:id", deleteGoal);

module.exports = router;
