const asyncHandler = require("express-async-handler");
//@desc Get goals
//@route GET/api/goals
//@access Private

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals right" });
});
//@desc set goals
//@route PUT/api/goals
//@access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json(goal);
});

//Updating data
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ mesage: `Update goal ${req.param.id}` });
});

//Delete specific data
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ mesage: `Delete goal ${req.param.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
