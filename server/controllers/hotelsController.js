import HotelModel from "../models/hotelsModel.js";

// get@ create hotels -> /api/hotels
export const createHotels = async (req, res) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// put@ update hotels -> /api/hotels/:id
export const updateHotel = async (req, res) => {
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
    res.status(500).json(error);
  }
};

// delete@ delete hotels -> /api/hotels/:id
export const deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  try {
    await HotelModel.findByIdAndDelete(hotelId);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get@ get hotels -> /api/hotels/:id
export const getHotelById = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await HotelModel.findById(hotelId);
    if (hotel) return res.status(200).json(hotel);
    else return res.status(404).json("Hotel not found !");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get@ get all hotels -> /api/hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};
