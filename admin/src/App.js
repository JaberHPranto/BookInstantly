import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { useAuthContext } from "./context/userContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import { userInputs } from "./formSource";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom.jsx";
import NewUser from "./pages/newUser/NewUser";
import Single from "./pages/single/Single";
import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoutes = ({ children }) => {
    const { user } = useAuthContext();
    if (!user) {
      return <Navigate to="/login" />;
    } else return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List column={userColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <NewUser inputs={userInputs} title="Add New User" />
                  </ProtectedRoutes>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List column={hotelColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <NewHotel />
                  </ProtectedRoutes>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List column={roomColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":roomId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <NewRoom />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
