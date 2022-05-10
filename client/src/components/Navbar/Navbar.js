/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from "react-router-dom"
import "./navbar.css"

function Navbar() {
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={() => navigate("/")}>
          BookInstantly 🔖
        </span>
        <div className="navItems">
          <button className="navBtn">Register</button>
          <button className="navBtn">Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
