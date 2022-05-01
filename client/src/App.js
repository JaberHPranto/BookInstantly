import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, HotelDetails, HotelsList } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelsList />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
