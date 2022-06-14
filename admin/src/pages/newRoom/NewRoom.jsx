import axios from "axios";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import "./newRoom.scss";

const NewRoom = () => {
  const [info, setInfo] = useState("");
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { loading, data } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    setHotelId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      const newRoom = {
        ...info,
        roomNumbers,
      };
      await axios.post(`/rooms/${hotelId}`, newRoom);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Room Number</label>
                <textarea
                  placeholder="give comma between room numbers"
                  onChange={(e) => setRooms(e.target.value)}
                />
              </div>
              <div className="selectRooms">
                <label htmlFor="hotelId">Choose a Hotel</label>
                <select id="hotelId" onChange={handleSelect}>
                  {loading
                    ? "Loading..."
                    : data?.map((hotel) => (
                        <option value={hotel._id} key={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
