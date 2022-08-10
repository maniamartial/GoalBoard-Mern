const mongoose = require("mongoose");

//Function to connect mongodb with our site
const connectDB = async () => {
  try {
    //connect by importing the password and username hidden from the env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    //print the comment if the site is connected to externala mongodb
    console.log(
      `MongoDB Connected successfully: ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(error);
    ///if you fall into an error just terminate the process
    process.exit(1);
  }
};

//make sure you export for it to be used outside the file
module.exports = connectDB;
