import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/NavBar";

// Pages
import Rental from "./pages/Rental";
import ChangeLocation from "./pages/ChangeLocation";
import ListedCars from "./pages/ListedCars";
import Auto from "./pages/Autos";
import BookNow from "./pages/BookNow";
import BookingConfirmation from "pages/BookingConformation";
import CallOrChat from "./pages/CallOrChat";
import Notifications from "./pages/Notifications";
import ProfilePage from "./features/profile/pages/profile";
import MyProfile from "./pages/MyProfile";
import Feedback from "./pages/Feedback";
import Calendar from "./pages/Calendar";
import CalendarScreen from "./pages/CalendarScreen";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Main Routes */}
      <Routes>
        {/* Home & Rental */}
        <Route path="/" element={<Rental />} />
        <Route path="/rental" element={<Rental />} />

        {/* Cars / Autos */}
        <Route path="/listed" element={<ListedCars />} />
        <Route path="/auto" element={<Auto />} />

        {/* Profile & User */}
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/change-location" element={<ChangeLocation />} />
        {/* Calendar */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar-screen" element={<CalendarScreen />} />

        {/* Booking Flow */}
        <Route path="/book-now/:id" element={<BookNow />} />
        <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
        <Route path="/call-or-chat" element={<CallOrChat />} />
      </Routes>
    </div>
  );
};

export default App;
