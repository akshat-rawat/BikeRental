import "./App.css";
import NavBar from "./components/nav-bar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Toast from "./utils/toast";

import BikePage from "./pages/bike-page";
import ReservationPage from "./pages/reservation-page";
import UserPage from "./pages/user-page";
import LogIn from "./pages/auth/log-in";
import SignUp from "./pages/auth/sign-up";

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
