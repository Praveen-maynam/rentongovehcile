import React from "react";
import { Routes, Route } from "react-router-dom";

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

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ✅ Navbar visible on all pages */}
      <Navbar />

      {/* ✅ Main Routes */}
      <Routes>
        <Route path="/" element={<Rental />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/listed" element={<ListedCars />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/my-profile" element={<MyProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar-screen" element={<CalendarScreen />} />
      </Routes>
    </div>
  );
};

export default App;
