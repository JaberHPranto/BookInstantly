import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRouteHandler from "./routes/authRoute.js";
import hotelsRouteHandler from "./routes/hotelsRoute.js";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use("/api/auth", authRouteHandler);
app.use("/api/hotels", hotelsRouteHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT} 😎`);
});
