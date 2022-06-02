import React from "react"
import { Link } from "react-router-dom"
import "./searchItemList.css"

function SearchItem({ item }) {
  return (
    <div className="searchItem">
      <img
        src={
          item.photos[0] ||
          "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        }
        alt="search"
        className="siImage"
      />
      <div className="siDesc">
        <span className="siTitle">{item.name}</span>
        <span className="siDistance">{item.address}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">Studio Apartment with Air conditioning</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="lsRating">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
        )}
        <div className="lsDetailsText">
          <span className="lsPrice">$ {item.cheapestPrice}</span>
          <span className="lsTaxOp">Includes Tax and Fess</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="lsAvailabilityBtn">See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
