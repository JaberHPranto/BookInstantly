import HotelModel from "../models/hotelsModel.js";
import RoomModel from "../models/roomModel.js";
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

// get@ get hotels -> /api/hotels/find/:id
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
  const { min, max, ...others } = req.query;

  try {
    const hotels = await HotelModel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 5000 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// get@ get counts of multiple cities -> /api/hotels/countByCity?cities=berlin,madrid,london
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const hotelList = await Promise.all(
      cities.map((city) => {
        return HotelModel.countDocuments({ city });
      })
    );
    res.status(200).json(hotelList);
  } catch (error) {
    next(error);
  }
};

// get@ count by type -> api/hotels/countByType
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await HotelModel.countDocuments({ type: "hotel" });
    const apartmentCount = await HotelModel.countDocuments({
      type: "apartment",
    });
    const villaCount = await HotelModel.countDocuments({ type: "villa" });
    const resortCount = await HotelModel.countDocuments({ type: "resort" });
    const cabinCount = await HotelModel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "villa", count: villaCount },
      { type: "resort", count: resortCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

//get @get all rooms of a hotel -> api/hotels/rooms/id
export const getAllRooms = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await HotelModel.findById(hotelId);
    const rooms = await Promise.all(
      hotel.rooms.map((room) => RoomModel.findById(room))
    );
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
