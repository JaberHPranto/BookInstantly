/* eslint-disable no-unused-vars */
import { format } from "date-fns"
import React, { useState } from "react"
import { DateRange } from "react-date-range"
import { useLocation } from "react-router-dom"
import { Header, Navbar } from "../../components"
import SearchItem from "../../components/SearchItemList/SearchItemList"
import useFetch from "../../hooks/useFetch"
import "./hotelList.css"

function HotelsList() {
  const location = useLocation()
  const [date, setDate] = useState(location.state?.date)
  const [destination, setDestination] = useState(location.state?.destination)
  const [options, setOptions] = useState(location.state?.options)
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, refetchData } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 5000}`,
  )

  const handleSearch = () => {
    refetchData()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label htmlFor="date">Check-In-Date to Check-Out-Date</label>
              <span onClick={() => setOpenDate(!openDate)} role="presentation">{`${format(
                date[0].startDate,
                "dd/MM/yyyy",
              )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="lsItem">
              <label htmlFor="options">Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>(per night)</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max Price <small>(per night)</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.adult}
                    min={1}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText" placeholder={options.children} min={0}>
                    Children
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button className="lsSearchBtn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : (
              <div>{data && data?.map((item) => <SearchItem key={item._id} item={item} />)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelsList
