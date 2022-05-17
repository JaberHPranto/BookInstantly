import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected !!!");
  } catch (error) {
    throw error;
  }
};

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connect();
  console.log(`Server started on port ${PORT} 😎`);
});
