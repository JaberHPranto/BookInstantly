import express from "express";
import {
  createRoom,
  deleteRooms,
  getRooms,
  getRoomsById,
  updateRoomAvailability,
  updateRooms,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomsById);
router.post("/:hotelId", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRooms);
router.put("/availability/:id", updateRoomAvailability);
router.delete("/:id/:hotelId", verifyAdmin, deleteRooms);

export default router;
