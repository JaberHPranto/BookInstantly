import HotelModel from "../models/hotelsModel.js";
import RoomModel from "../models/roomModel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new RoomModel(req.body);
  try {
    const savedRoom = await newRoom.save();

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: {
          rooms: savedRoom._id,
        },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRooms = async (req, res, next) => {
  const roomsId = req.params.id;
  try {
    const updatedRooms = await RoomModel.findByIdAndUpdate(
      roomsId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRooms);
  } catch (error) {
    next(error);
  }
};

// delete@ delete rooms -> /api/roomss/:id
export const deleteRooms = async (req, res, next) => {
  const roomsId = req.params.id;
  const hotelId = req.params.hotelId;
  try {
    await RoomModel.findByIdAndDelete(roomsId);
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: {
          rooms: roomsId,
        },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("rooms has been deleted");
  } catch (error) {
    next(error);
  }
};

// get@ get rooms -> /api/rooms/:id
export const getRoomsById = async (req, res, next) => {
  const roomsId = req.params.id;
  try {
    const rooms = await RoomModel.findById(roomsId);

    res.status(200).json(rooms);
  } catch (error) {
    // console.log(error);
    next(createError(404, "Rooms not found!"));
  }
};

// get@ get all rooms -> /api/rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

//update @put  update room's unavailability -> api/rooms/availability/id
export const updateRoomAvailability = async (req, res, next) => {
  try {
    const room = await RoomModel.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Room's availability has been updated ");
  } catch (error) {
    next(error);
  }
};
