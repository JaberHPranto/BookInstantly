import express from "express";
import {
  countByCity,
  countByType,
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

router.get("/find/:id", getHotelById);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
