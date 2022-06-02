import React, { useState } from "react"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaWindowClose } from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"
import { useParams } from "react-router-dom"
import { Footer, Header, MailList, Navbar } from "../../components"
import useFetch from "../../hooks/useFetch"
import "./hotelDetails.css"

function HotelDetails() {
  const [sliderNo, setSliderNo] = useState(0)
  const [open, setOpen] = useState(false)

  const { id } = useParams()

  const { loading, data: hotel } = useFetch(`/hotels/find/${id}`)

  const handleOpen = (index) => {
    setSliderNo(index)
    setOpen(true)
  }
  const handleDirection = (direction) => {
    let newSlideNumber
    if (direction === "l") {
      newSlideNumber = sliderNo === 0 ? 5 : sliderNo - 1
    } else newSlideNumber = sliderNo === 5 ? 0 : sliderNo + 1

    setSliderNo(newSlideNumber)
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading..."
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FaWindowClose className="close" role="presentation" onClick={() => setOpen(false)} />
              <FaArrowAltCircleLeft
                className="arrow left-arrow"
                role="presentation"
                onClick={() => handleDirection("l")}
              />
              <div className="sliderWrapper">
                <img src={hotel?.photos[sliderNo]} alt="" className="sliderImg" />
              </div>
              <FaArrowAltCircleRight
                className="arrow right-arrow"
                role="presentation"
                onClick={() => handleDirection("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="reserveBtn">Reserve or Book Now</button>
            <h1 className="hotelTitle">{hotel.name}</h1>
            <div className="hotelAddress">
              <MdLocationOn />
              <span>{hotel.address}</span>
            </div>
            <span className="hotelDistance">{hotel.distance} km</span>
            <span className="hotelPriceHighlight">
              Book a stay over ${hotel.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {hotel.photos?.map((photo, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="hotelImageWrapper" key={idx}>
                  <img
                    src={photo.src}
                    alt="hotel pic"
                    className="hotelImg"
                    role="presentation"
                    onClick={() => handleOpen(idx)}
                  />
                </div>
              ))}
            </div>

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{hotel.title}</h1>
                <p className="hotelDesc">{hotel.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an excellent location score
                  of 9.8!
                </span>
                <h2>
                  <b>$945</b> (9 nights)
                </h2>
                <button className="bookBtn">Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default HotelDetails
