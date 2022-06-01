import express from "express";
import {
  createHotels,
  deleteHotel,
  getHotelById,
  getHotels,
  updateHotel,
} from "../controllers/hotelsController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", getHotels);
router.post("/", verifyAdmin, createHotels);

router.get("/:id", getHotelById);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;
