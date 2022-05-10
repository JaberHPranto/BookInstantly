import "./mailList.css"

function MailList() {
  return (
    <div className="mail">
      <div className="mailText">
        <h2 className="mailTitle">Save time, save money!</h2>
        <span className="mailDesc">Sign up and we&#39;ll send the best deals to you</span>
      </div>
      <div className="mailInputContainer">
        <input type="text" className="mailInput" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
