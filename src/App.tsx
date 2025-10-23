import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/layout/NavBar";

// Pages
import Rental from "./pages/Rental";
import ChangeLocation from "./pages/ChangeLocation";
import ListedCars from "./pages/ListedCars";
import Auto from "./pages/Autos";
import ListAutoPage from "./pages/ListAutoPage";
import ListCarPage from "./pages/ListCarPage";
import ListBikePage from "./pages/ListBikePage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import VehicleHistory from "./pages/VehicleHistory";
import EditCarDetails from "./pages/EditCarDetails";
import BookNow from "./pages/BookNow";
import ListedBikes from "pages/ListedBikes";
import NotificationPage from "./features/profile/pages/notification";
import ProfilePage from "./features/profile/pages/profile";
import MyProfile from "./pages/MyProfile";
import MyBookings from "./pages/MyBookings";
import MyListingBookings from "./pages/MyListingBookings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import Help from "./pages/Help";
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
       <Route path="/listed" element={<ListedBikes />} />

        <Route path="/auto" element={<Auto />} />
        <Route path="/list-auto" element={<ListAutoPage />} />
        <Route path="/list-car" element={<ListCarPage />} />
          <Route path="/list-bike" element={<ListBikePage />} />
        <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
        <Route path="/vehicle-details/:vehicleName" element={<VehicleHistory />} />
        <Route path="/vehicle-details/:vehicleName/edit/:bookingId" element={<EditCarDetails />} />

        {/* Profile & User */}
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-listing-bookings" element={<MyListingBookings />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/change-location" element={<ChangeLocation />} />
        
        {/* Support & Info */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        {/* Calendar */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar-screen" element={<CalendarScreen />} />

        {/* Booking Flow */}
        <Route path="/book-now/:id" element={<BookNow />} />
      </Routes>
    </div>
  );
};

export default App;
