import "./App.css";
import NavBar from "./components/nav-bar";
import { useCookies } from "react-cookie";
import { createContext, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Toast from "./utils/toast";

import BikePage from "./pages/bike-page";
import ReservationPage from "./pages/reservation-page";
import UserPage from "./pages/user-page";
import LogIn from "./pages/auth/log-in";
import SignUp from "./pages/auth/sign-up";
import NotFound from "./pages/not-found";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    if (!user) {
      if (cookies.user) {
        setUser(cookies.user);
      }
    }
  }, [cookies.user, user]);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          {user && <NavBar />}
          <Toast />
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<BikePage />} />
                <Route path="/reservations" element={<ReservationPage />} />
                {user.isManager && <Route path="/users" element={<UserPage />} />}
              </>
            ) : (
              <>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
              </>
            )}
            <Route path="/" element={<LogIn />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
