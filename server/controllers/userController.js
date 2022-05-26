import UserModel from "../models/userModel.js";
import createError from "../utils/error.js";

// put@ update users -> /api/users/:id
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true } // to get updated document
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// delete@ delete users -> /api/users/:id
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await UserModel.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

// get@ get users -> /api/users/:id
export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    // console.log(error);
    next(createError(404, "User not found!"));
  }
};

// get@ get all users -> /api/users
export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
