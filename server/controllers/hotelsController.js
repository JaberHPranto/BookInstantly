import HotelModel from "../models/hotelsModel.js";
import createError from "../utils/error.js";

// get@ create hotels -> /api/hotels
export const createHotels = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

// put@ update hotels -> /api/hotels/:id
export const updateHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      hotelId,
      {
        $set: req.body,
      },
      { new: true } // to get updated document
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

// delete@ delete hotels -> /api/hotels/:id
export const deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    await HotelModel.findByIdAndDelete(hotelId);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

// get@ get hotels -> /api/hotels/:id
export const getHotelById = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await HotelModel.findById(hotelId);

    res.status(200).json(hotel);
  } catch (error) {
    // console.log(error);
    next(createError(404, "Hotel not found!"));
  }
};

// get@ get all hotels -> /api/hotels
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
