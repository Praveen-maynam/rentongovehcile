
import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useNotificationStore } from "./store/notification.store";

// Layout
import Navbar from "./components/layout/NavBar";

// Pages
import Rental from "./pages/Rental";
import ChangeLocation from "./pages/ChangeLocation";
import ListCarPage from "./pages/ListCarPage";
import ListBikePage from "./pages/ListBikePage";
import Nearbycars from "./pages/NearByCars";
import NearbyBikes from "./pages/NearByBikes";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import VehicleHistory from "./pages/VehicleHistory";
import EditCarDetails from "./pages/EditCarDetails";
import BookNow from "./pages/BookNow";
import NotificationPage from "./features/profile/pages/notification";
import ProfilePage from "./features/profile/pages/profile";
import MyProfile from "./pages/MyProfile";
import MyBookings from "./pages/MyBookings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import Calendar from "./pages/Calendar";
import CalendarScreen from "./pages/CalendarScreen";

import CarDetails from "./pages/CarDetails";

import BikeDetails from "./pages/BikeDetails";

import ListedCars from "./pages/ListedCars";
import ListedBikes from "./pages/ListedBikes";
import BookingDetail from "pages/BookingHistory";
import Register from "pages/Register";
import { useLocation } from "react-router-dom";
// import OwnerDashboard from "pages/OwnerDashboard";
// import { BookingProvider } from "./components/ui/BookingAcceptance";
// import BookingAcceptanceWithAPI from "./components/ui/BookingAcceptanceWrapper";
import SupportTicketsPage from "./components/ui/SupportTickets";
import RaiseTicketPage from "./components/ui/RaiseTicketPage";
import GlobalBookingModals from "./components/ui/GlobalBookingModals";

const App: React.FC = () => {
  const location = useLocation();
  const { initializeSocket, disconnectSocket, fetchNotifications } = useNotificationStore();

  // Initialize notification socket when user is logged in
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      console.log('🔔 App: Initializing notification system for user:', userId);
      initializeSocket(userId);
      fetchNotifications(userId);
    }

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, [initializeSocket, disconnectSocket, fetchNotifications]);

  // Pages where navbar should NOT show
  const hideNavbarPaths = ["/", "/register"];

  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    // <BookingProvider>
    <div className="min-h-screen bg-[#f8fafc]">


      {!hideNavbar && <Navbar />}


      <Routes>
        {/* Home & Rental */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/" element={<Rental />} /> */}
        <Route path="/rental" element={<Rental />} />
        {/* <Route path="/owner-dashboard" element={<OwnerDashboard />} /> */}
        {/* List Vehicles */}
        <Route path="/list-car" element={<ListCarPage />} />
        <Route path="/list-bike" element={<ListBikePage />} />



        {/* Nearby Vehicles */}
        <Route path="/nearby-cars" element={<Nearbycars />} />
        <Route path="/nearby-bikes" element={<NearbyBikes />} />

        {/* Vehicle Details */}
        <Route path="/vehicle-details/:id" element={<VehicleDetailsPage />} />

        {/* Edit Vehicle Details */}
        <Route path="/Car-Details/:carId" element={<CarDetails />} />
        {/* <Route path="/Bike-Details/:bikeId" element={<BikeDetails />} /> */}
        <Route path="/Bike-Details/:bikeId" element={<BikeDetails />} />


        {/* Vehicle History & Booking */}
        <Route path="/vehicle-history/:vehicleName" element={<VehicleHistory />} />
        <Route path="/vehicle-details/:vehicleName/edit/:bookingId" element={<EditCarDetails />} />

        {/* Booking */}
        <Route path="/book-now/:id" element={<BookNow />} />
        <Route path="/booking-detail/:vehicleId" element={<BookingDetail />} />

        {/* Profile & User */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/mybookings" element={<MyBookings />} />

        {/* Notifications & Feedback */}
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Location */}
        <Route path="/change-location" element={<ChangeLocation />} />

        {/* Support & Info */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />


        <Route path="/listed" element={<ListedCars />} />
        <Route path="/listed-bike" element={<ListedBikes />} />



        <Route path="/Support-Ticket" element={<SupportTicketsPage />} />
        <Route path="/Raise-Ticket" element={<RaiseTicketPage />} />


        <Route path="/feedback" element={<Feedback />} />
        {/* <Route path="/notifications" element={<Notifications />} /> */}
        {/* <Route path="/reviews/:id" element={<VehicleReviews />} /> */}

        {/* Calendar */}
        <Route path="/calendar" element={<Calendar onConfirm={() => console.log("Confirmed!")} />} />
        <Route path="/calendar-screen" element={<CalendarScreen />} />
      </Routes>

      {/* Global Booking Modals - Shows on all screens */}
      <GlobalBookingModals />
    </div>
    // </BookingProvider>
  );
};

export default App;