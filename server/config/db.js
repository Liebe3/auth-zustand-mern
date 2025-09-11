const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        dbName: "zustand-auth",
      },
      console.log("MongoDB Connected")
    );
  } catch (error) {
    console.error("Something went wrong", error);
    process.exit(1);
  }
};

module.exports = connectDB;
