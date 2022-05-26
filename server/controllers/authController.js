import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import createError from "../utils/error.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json("User has been created successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword)
      return next(createError(400, "Wrong username or password"));

    // setting tokens
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherDetails);
  } catch (error) {
    next(error);
  }
};
