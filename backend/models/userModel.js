const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add name"],
    },

    email: {
      type: String,
      required: [true, "Add an email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Add password"],
    },
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model("User", userSchema);

/*

const profileSchema = mongoose.Shema({
  fname: {
    type: String,
    required: [true, "Add first name"],
  },

  sname: {
    type: String,
    required: [true, "Add first name"],
  },

  email: {
    type: String,
    required: [true, "Add first name"],
  },

  password: {
    type: String,
    required: [true, "Add first name"],
  },
},

{
  timestamps:true;
});

module.exports=mongoose.model("Profile", profileSchema)

*/
