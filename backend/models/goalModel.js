const mongoose = require("mongoose");

//Schema is a single table
const goalSchema = mongoose.Schema(
  {
    //user is used to indicate the rlationship 1-1
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    //This is an entity or a field, its called a text which will only allow string,
    text: {
      type: String,
      required: [true, "Please add a text value mf"],
    },
  },
  {
    timestamps: true,
  }
);

const lostSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [false, "Try to enter lol"],
    },
  },
  {
    timestamps: true,
  }
);
//Export your function to be used n an external files
module.exports = mongoose.model("Goal", goalSchema);
