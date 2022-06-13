import axios from "axios"
import React, { useState } from "react"
import { IoCloseCircleOutline } from "react-icons/io5"
import { useSearchContext } from "../../context/searchContext"
import useFetch from "../../hooks/useFetch"
import "./reserve.css"

function Reserve({ setOpen, hotelId }) {
  const { data: rooms } = useFetch(`/hotels/rooms/${hotelId}`)
  const [selectedRooms, setSelectedRooms] = useState([])

  const handleChange = (e) => {
    const { checked } = e.target
    const { value } = e.target
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value),
    )
  }
  console.log(rooms)
  const { date } = useSearchContext()
  const getDateInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const dateCount = new Date(start.getTime())
    const dates = []
    while (dateCount <= end) {
      dates.push(new Date(dateCount).getTime())
      dateCount.setDate(dateCount.getDate() + 1)
    }

    return dates
  }
  const allDates = getDateInRange(date[0].startDate, date[0].endDate)

  const isAvailable = (roomNumbers) => {
    const isFound = roomNumbers.unavailableDates.some((dateItem) =>
      allDates.includes(new Date(dateItem).getTime()),
    )
    return !isFound
  }
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((room) => {
          const res = axios.put(`/rooms/availability/${room}`, {
            dates: allDates,
          })
          return res.data
        }),
      )
      setOpen(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }
  return (
    <div className="reserve">
      <div className="rContainer">
        <IoCloseCircleOutline className="rIcon" size="20px" onClick={() => setOpen(false)} />
        {rooms.map((room) => (
          <div className="rItem" key={room._id}>
            <div className="rItemInfo">
              <div className="rTitle">{room.title}</div>
              <div className="rDesc">{room.desc}</div>
              <div className="rMax">
                Max People : <b>{room.maxPeople}</b>
              </div>
              <div className="rPrice">${room.price}</div>
            </div>
            <div className="rSelectRooms">
              {room.roomNumbers.map((item) => (
                <div className="room" key={item._id}>
                  <label htmlFor={room._id}>{item.number}</label>
                  <input
                    type="checkbox"
                    value={item._id}
                    onChange={handleChange}
                    id={item._id}
                    disabled={!isAvailable(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reserve
