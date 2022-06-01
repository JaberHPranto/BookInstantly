import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// middleware route checks
// router.get("/check-token", verifyToken, (req, res, next) => {
//   console.log(req.user);
//   res.send("Hello User ! You're logged in");
// });
// router.get("/check-user/:id", verifyUser, (req, res, next) => {
//   res.send("You're verified user and can delete your account");
// });
// router.get("/check-admin/:id", verifyAdmin, (req, res, next) => {
//   res.send("You're an admin and can delete all accounts");
// });

router.get("/", verifyAdmin, getUsers);

router.get("/:id", verifyUser, getUserById);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

export default router;
