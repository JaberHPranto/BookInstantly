import {
  Featured,
  FeaturedProperties,
  Footer,
  Header,
  MailList,
  Navbar,
  PropertyList,
} from "../../components"
import "./home.css"

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h2 className="homeTitle">Browse by property type</h2>
        <PropertyList />
        <h2 className="homeTitle">Homes guests love</h2>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Home
