import "./navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">BookInstantly 🔖</span>
        <div className="navItems">
          <button className="navBtn">Register</button>
          <button className="navBtn">Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
