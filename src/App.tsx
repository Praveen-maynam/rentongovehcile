import React from "react";
import { Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import Navbar from "./components/layout/NavBar.tsx";
import Rental from "./pages/Rental.tsx";
import ListedCars from "./pages/ListedCars.tsx";
import Auto from "./pages/Autos.tsx";
import Notifications from "./pages/Notifications.tsx";
import ProfilePage from "./pages/Profile.tsx";

import MyProfile from "./pages/MyProfile.tsx";
import Feedback from "./pages/Feedback.tsx";
import Calendar from "./pages/Calendar.tsx";
import CalendarScreen from "./pages/CalendarScreen.tsx";
=======
import Navbar from "./components/layout/NavBar";
import Rental from "./pages/Rental";
import ListedCars from "./pages/ListedCars";
import Auto from "./pages/Autos";
import Notifications from "./pages/Notifications";
import ProfilePage from "./pages/ProfilePage";
import MyProfile from "./pages/MyProfile";
import Feedback from "./pages/Feedback";
import Calendar from "./pages/Calendar";
import CalendarScreen from "./pages/CalendarScreen";


>>>>>>> e2b9d9e4a57655fc75c8aef7be996c79716f6a1f

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Rental />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/listed" element={<ListedCars />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/profile" element={<ProfilePage/>} /> {/* lowercase path */}
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar-screen" element={<CalendarScreen />} />
       
      </Routes>
    </div>
  );
};

export default App;
