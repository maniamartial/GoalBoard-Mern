const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

//@desc Get goals
//@route GET/api/goals
//@access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//@desc set goals
//@route PUT/api/goals
//@access Private
const setGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//Updating data
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
});

//Delete specific data
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findbyId(req.params.id);
  if (goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
