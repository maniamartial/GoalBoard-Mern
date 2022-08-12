const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

//@desc Get goals
//@route GET/api/goals
//@access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@desc set goals
//@route PUT/api/goals
//@access Private
const setGoals = asyncHandler(async (req, res) => {
  //create is a keyword which accepts and write the new data to the database
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

//Updating data /modify
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  //confirm if the loggedin User has any goal in the db
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  //lets find the current user id
  const user = await User.findById(req.user.id);
  //check the availability of the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //findByIdUpdate is akeyword functionality to modify already existing data
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
});

//Delete specific data
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  //Confirm if the item exist for the current user
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await goal.remove();

  res.status(200).json({ id: req.params.id });
});
//export all functions to be used with an external file
module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
