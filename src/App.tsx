import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/NavBar.tsx";
import Rental from "./pages/Rental.tsx";
import Listed from "./pages/Listed.tsx";
import Auto from "./pages/auto.tsx";
import Notifications from "./pages/Notifications.tsx";
import ProfilePage from "./pages/profile.tsx";
import MyProfile from "./pages/profile/MyProfile.tsx";
import Feedback from "./pages/Feedback.tsx";
import CalendarPage from "./pages/CalenderPage.tsx";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Rental />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/listed" element={<Listed />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/my-profile" element={<MyProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </div>
  );
};

export default App;
