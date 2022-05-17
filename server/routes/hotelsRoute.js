import express from "express";
import {
  createHotels,
  deleteHotel,
  getHotelById,
  getHotels,
  updateHotel,
} from "../controllers/hotelsController.js";

const router = express.Router();

router.get("/", getHotels);
router.post("/", createHotels);

router.get("/:id", getHotelById);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
