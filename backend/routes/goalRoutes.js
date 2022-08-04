const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
//Follow crude
//Extract data from db
router.get("/", getGoals);

//user to post data
router.post("/", setGoals);

//Updating data
router.put("/:id", updateGoal);

//Delete specific data
router.get("/:id", deleteGoal);

module.exports = router;
