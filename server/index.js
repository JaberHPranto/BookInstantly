import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRouteHandler from "./routes/authRoute.js";
import hotelsRouteHandler from "./routes/hotelsRoute.js";
import roomRouteHandler from "./routes/roomsRoute.js";
import usersRouteHandler from "./routes/usersRoute.js";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouteHandler);
app.use("/api/hotels", hotelsRouteHandler);
app.use("/api/users", usersRouteHandler);
app.use("/api/rooms", roomRouteHandler);

// error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong !";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT} 😎`);
});
