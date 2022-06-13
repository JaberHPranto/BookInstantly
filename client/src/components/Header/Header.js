/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { format } from "date-fns"
import { useState } from "react"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { FaPlane, FaTaxi } from "react-icons/fa"
import { IoBedOutline, IoCalendarOutline, IoPersonOutline } from "react-icons/io5"
import { MdAttractions, MdDirectionsCar, MdLocalHotel } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { useSearchContext } from "../../context/searchContext"
import { useAuthContext } from "../../context/userContext"
import "./header.css"

function Header({ type }) {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [destination, setDestination] = useState("")
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })

  const navigate = useNavigate()
  const { dispatch } = useSearchContext()
  const { user } = useAuthContext()

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } })
    navigate("/hotels", { state: { destination, date, options } })
  }

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItems">
            <MdLocalHotel />
            <span>Stays</span>
          </div>
          <div className="headerListItems">
            <FaPlane />
            <span>Flights</span>
          </div>
          <div className="headerListItems">
            <MdDirectionsCar />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItems">
            <MdAttractions />
            <span>Attractions</span>
          </div>
          <div className="headerListItems">
            <FaTaxi />
            <span>Airport Taxi&#39;s</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">A lifetime of discounts? It&#39;s Genius.</h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or more with a free
              bookInstantly account
            </p>
            {user ? user.username : <button className="headerBtn">Sign in / Register</button>}

            <div className="headerSearch">
              {/* Destination section */}
              <div className="headerSearchItem">
                <IoBedOutline className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going ?"
                  className="headerSearchInput"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              {/* Calender Date section */}
              <div className="headerSearchItem">
                <IoCalendarOutline className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy",
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              {/* Number of People Section */}
              <div className="headerSearchItem">
                <IoPersonOutline className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenOptions(!openOptions)}
                >{`${options.adult} adults - ${options.children} children - ${options.room} rooms`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionsItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          disabled={options.adult <= 1}
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionsItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          disabled={options.children <= 0}
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionsItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          disabled={options.room <= 1}
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
