import "./App.css";
import NavBar from "./comps/nav-bar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Toast from "./utils/toast";

import BikePage from "./comps/bike-page";
import ReservationPage from "./comps/reservation-page";
import UserPage from "./comps/user-page";
import LogIn from "./comps/log-in";
import SignUp from "./comps/sign-up";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Toast />
        <Routes>
          <Route path="/" element={<BikePage />} />
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
